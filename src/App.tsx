import { useState } from 'react'
import {z} from 'zod'
import {useForm,SubmitErrorHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'


const formSchema = z.object({
  login: z.string().min(1, {message: 'Este campo não pode estar vazio'}),
  senha: z.string().min(1, {message: 'Este campo não pode estar vazio'}),
})

function App() {
  const [count, setCount] = useState(0)

  type formSchemaType = z.infer<typeof formSchema>

  const {register, handleSubmit,formState:{errors}} = useForm<formSchemaType>({
    resolver:zodResolver(formSchema)
  })

  const validForm = (data:formSchemaType)=>{
    console.log(data)
  }

  const invalidForm = (errors:any)=>{
    console.log(errors)
  }

  const {card,container,inp,error} = {
    container: {backgroundColor: '#ebe4f2', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'},
    card: {backgroundColor: '#201f21', padding: `5%`, height: 'auto',width:`30%`, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, color: 'white', fontSize: 20, fontWeight: 'bold',flexFlow:'column nowrap'},
    inp:{padding:10,margin:10,width:'70%'},
    error:{color:'red',fontWeight:'bold',fontSize:'1rem'}

  }


  return (
    <div style={container} >
    <form  style={card}   onSubmit={handleSubmit(validForm,invalidForm)}>
      <input style={{...inp,...errors?.login?{borderColor:'#de3731',outlineColor:'red',boxShadow:'2px 2px 3px  red'}:{}}}{...register("login")} type="text"  placeholder='login' />
      {errors?.login && <span style={error} >{errors?.login?.message}</span>}
      <input style={{...inp,...errors?.senha?{borderColor:'#de3731',outlineColor:'red',boxShadow:'2px 2px 3px  red'}:{}}} {...register("senha")}  type="text"  placeholder='senha'/>
      {errors?.senha && <span style={error}>{errors?.senha?.message}</span>}
      <button type='submit' >Salvar</button>
    </form>
    </div>
  )
}

export default App
