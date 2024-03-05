import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import produto from '../../../models/produto';
import tipo from '../../../models/tipo';
import { buscar, atualizar, cadastrar } from '../../../services/Service';


function Formularioproduto() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [tipos, settipos] = useState<tipo[]>([]);

  const [tipo, settipo] = useState<tipo>({
    id: 0,
    descricao: '',
  });

  const [produto, setproduto] = useState<produto>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tipo: null,
    usuario: null,
  });

  async function buscarprodutoPorId(id: string) {
    await buscar(`/produtos/${id}`, setproduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscartipoPorId(id: string) {
    await buscar(`/tipos/${id}`, settipo, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscartipos() {
    await buscar('/tipos', settipos, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscartipos();
    if (id !== undefined) {
      buscarprodutoPorId(id);
      console.log(tipo);

    }
  }, [id]);

  useEffect(() => {
    setproduto({
      ...produto,
      tipo: tipo,
    });
  }, [tipo]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setproduto({
      ...produto,
      [e.target.name]: e.target.value,
      tipo: tipo,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/produtos');
  }

  async function gerarNovaproduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ produto });

    if (id != undefined) {
      try {
        await atualizar(`/produtos`, produto, setproduto, {
          headers: {
            Authorization: token,
          },
        });
        alert('produto atualizada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar a produto');
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setproduto, {
          headers: {
            Authorization: token,
          },
        });

        alert('produto cadastrada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrar a produto');
        }
      }
    }
  }

  const carregandotipo = tipo.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar produto' : 'Cadastrar produto'}</h1>

      <form onSubmit={gerarNovaproduto} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da produto</label>
          <input
            value={produto.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da produto</label>
          <input
            value={produto.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>tipo da produto</p>
          <select name="tipo" id="tipo" className='border p-2 border-slate-800 rounded' onChange={(e) => buscartipoPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione um tipo</option>
            {tipos.map((tipo) => (
              <>
                <option value={tipo.id} >{tipo.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={carregandotipo} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
          {carregandotipo ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default Formularioproduto;