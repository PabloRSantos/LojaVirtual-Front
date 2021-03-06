import React, {useState, useEffect} from "react"
import api from "../../../services/api"
import "./style.css"
import DropZone from "../../../components/Dropzone"
import Header from "../../../components/header"
import Sucess from "../../../components/Sucess"

const AddProduto = () => {
    const [formData, setFormData] = useState([])
    const [selected, setSelected] = useState([])
    const [categorias, setCategorias] = useState([])
    const [selectedFile, setSelectedFile] = useState()
    const [classSucess, setClassSucess] = useState("hiddenSucess")
    const [messageSucess, setMessageSucess] = useState("Postado com sucesso!")
    const [typeSucess, setTypeSucess] = useState("sucess")

    useEffect(() => {
        api.get("categorias")
        .then(response => {
            setCategorias(response.data)
        })
    }, [])

    function handleChange(event){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    function handleSelect(event){
        const valor = event.target.value
        setSelected(valor)
    }   

    function submitForm(event){
    event.preventDefault()


    const {nome, preco, descricao, cores, unidades} = formData

    
    const data = new FormData()

    data.append("nome", nome)
    data.append("preco", preco)
    data.append("descricao", descricao)
    data.append("cores", cores)
    data.append("unidades", unidades)
    data.append("modelo", "aaa")
    data.append("categorias[]", [selected])

    if (selectedFile) {
        data.append("imagem", selectedFile)
    }


    api.post("products", data)
    .then(response => {
        if(response.data.sucess){
           return setClassSucess("showSucess")
        }

            setMessageSucess("Erro ao cadastrar, tente novamente")
            setTypeSucess("error")
            setClassSucess("showSucess")

    }).catch(()=> {
        setMessageSucess("Erro ao cadastrar, tente novamente")
        setTypeSucess("error")
        setClassSucess("showSucess")
    })
        
    }
    
return (
    <>      

     <Sucess
     message={messageSucess}
     classSucess={classSucess}
     type={typeSucess}
     />

     <Header />
    <main id="AddProduto">
        <form>
            <div className="campo">
                <label htmlFor="nome">Titulo:</label><br/>
                
                <input type="text" onChange={handleChange} name="nome" id="nome" required/>
            </div>

            <div className="campo">
                <label htmlFor="descricao">Descrição:</label><br/>
                
                <textarea name="descricao" id="descricao" onChange={handleChange} required></textarea>
            </div>

            <div className="campoGrupo">

            <div className="unidade">
                <label htmlFor="unidades">Unidades:</label><br/>
                
                <input type="text" name="unidades" onChange={handleChange} id="unidades" required/>
            </div>

            <div className="tag">
                <label htmlFor="tags">Tags:  (opcional)</label><br/>
                
                <input type="text"onChange={handleChange} placeholder="Ex: Carros Esportivos, Brasileiro, 2020" name="tags" id="tags"/>
            </div>

            </div>

            <div className="campoGrupo">

            <div className="categoria">
                <label htmlFor="categorias">Categoria:</label>

                <select onChange={handleSelect} value={selected} id="categorias" name="categorias">
                    <option>Clique aqui</option>
                {categorias.map(categoria => (
                    <option key={categoria.nome} value={categoria.id}>{categoria.nome}</option>
                ))}
                
                 </select> 
            </div>

            <div className="preco">
                <label htmlFor="preco">Preço:</label><br/>
                
                <input type="text" onChange={handleChange} name="preco" id="preco"/>
            </div>

            </div>

            <div className="campo">
                <label htmlFor="cores">Cores:</label><br/>
                
                <input type="text" placeholder="Ex: Vermelho, Azul, Verde" name="cores" onChange={handleChange} id="cores"/>
            </div>

            <DropZone onFileUploaded={setSelectedFile}/>

            <button onClick={submitForm}>Publicar</button>

        </form>
    </main>
    </>
)

}

export default AddProduto