import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../BD/firebase-config';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

function Material() {


    const [datosLibro, setdatosLibro] = useState({

        titulo: '',
        autor: '',
        year: '',
        categoria: '',
        ruta: '',
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosLibro((prevDatos) => ({
            ...prevDatos,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setdatosLibro((prevDatos) => ({
            ...prevDatos,
            [name]: selectedOption ? selectedOption.value : ''
        }));
    };

    // Cambia el input de archivo para guardar el File en el estado
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setdatosLibro((prevDatos) => ({
            ...prevDatos,
            ruta: file,
        }));
    };

    const categorias = [
        { value: "Arquitectura", label: "Arquitectura" },
        { value: "Medicina", label: "Medicina" },
        { value: "Programación", label: "Programación" },

    ];





    const location = useLocation();
    const tipo = location.state?.tipo || 'add'; // Valor predeterminado si no se pasa `tipo`


    const handleGuardarMaterial = async (e) => {
        e.preventDefault();

        try {
            let fileUrl = '';
            // Subir archivo si hay uno seleccionado
            if (datosLibro.ruta instanceof File) {
                const storage = getStorage();
                const storageRef = ref(storage, `Material/${datosLibro.ruta.name}`);
                await uploadBytes(storageRef, datosLibro.ruta);
                fileUrl = await getDownloadURL(storageRef);
            }

            // Guardar en Firestore
            await addDoc(collection(db, "Material"), {
                Titulo: datosLibro.titulo,
                Autor: datosLibro.autor,
                Year: datosLibro.year,
                Categoria: datosLibro.categoria,
                Ruta: 'Material/' + datosLibro.ruta.name, // Guarda la ruta del archivo
            });

            alert('Material guardado correctamente');
            // Opcional: limpiar formulario o navegar
        } catch (error) {
            alert('Error al guardar material: ' + error.message);
        }
    };





    const renderContent = () => {
        switch (tipo) {
            case 'add':
                return (
                    <>
                        <div className='container'>
                            <div className='d-flex flex-row justify-content-center'>
                                <h1 className='display-3'>Agregar Material</h1>
                            </div>



                            <input
                                type="text"
                                placeholder="Nombre del Material"
                                className="form-control m-2"
                                name="titulo"
                                value={datosLibro.titulo}
                                onChange={handleChange}
                            />






                            <input
                                type="text"
                                placeholder="Autor del Material"
                                className="form-control m-2"
                                name="autor"
                                value={datosLibro.autor}
                                onChange={handleChange}
                            />



                            <input
                                type="number"
                                placeholder="Año del Material"
                                className="form-control m-2"
                                name="year"
                                min="1900"
                                max="2100"
                                value={datosLibro.year}
                                onChange={handleChange}
                            />



                            <Select
                                options={categorias}
                                placeholder="Categoria"
                                className="form-select m-2"
                                name="categoria"
                                value={categorias.find(option => option.value === datosLibro.categoria) || null}
                                onChange={handleSelectChange}
                            />

                            <input
                                className="form-control m-2"
                                type="file"
                                name="ruta"
                                onChange={handleFileChange}
                            />
                            <button className="btn btn-primary m-2" onClick={handleGuardarMaterial}>
                                Guardar Material
                            </button>


                        </div>
                    </>
                );

            case 'view':
                return (
                    <>

                    </>
                );

            case 'modi':
                return (
                    <>

                    </>
                );

            case 'dele':
                return (
                    <>

                    </>
                );


            default:
                return <p>Tipo no reconocido</p>;
        }
    };




    return (

        <div className='w-100 bg-dark text-white mx-5' style={{ minHeight: '100vh' }} >
            <div className='container'>





                {renderContent()}



            </div>

        </div>
    );
}

export default Material;