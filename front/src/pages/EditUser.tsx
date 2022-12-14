import { Button, Card, Label, TextInput } from "flowbite-react/lib/esm/components"
import Header from "../components/Header"
import "../styles/main.css"
import "../styles/datepicker.css"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-BR';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';

import React, { FormEvent, useEffect, useState } from "react";
import {FaUserEdit} from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Root() {
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [name, setName] = useState<string>("")
    const { id } = useParams()

    useEffect(()=>{
        axios.get('http://localhost:3000/users/' + id)
        .then(function (response: any) { 
            setName(response.data.name)
            setBirthDate(dayjs(response.data.birthDate))
        })
        .catch(function (error) {
            // handle error
        })
        .finally(function () {
            // always executed
        });
    }, [])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        
        if(!birthDate?.isValid()){
            toast.error('Selecione uma data válida', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
        
        axios({
            method: 'put',
            url: 'http://localhost:3000/users/' + id,
            data: {
                name: name,
                birthDate: birthDate?.toDate().toISOString()
            }
        }).then(function (response) {
            toast.success("Usuário editado com sucesso", {
                position: toast.POSITION.TOP_CENTER
            })
        }).catch(function (error) { 
            toast.error(error.response.data.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        })
     
    }

    return (
        <>
            <Header />
            
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <h1 className="my-10 text-3xl flex items-center justify-center gap-4 font-bold text-gray-900">
                <FaUserEdit fill="rgba(17,24,39)"/>
                Editar Usuário
            </h1>
            <Card className="max-w-lg my-5 right-0 relative mx-auto">
                <form
                    onSubmit={(e)=>handleSubmit(e)}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="name"
                                value="Nome"
                            />
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Joãozinho da Silva"
                            shadow={true}
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="birthDate"
                                value="Data de Nascimento"
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DatePicker
                                value={birthDate}
                                onChange={(newValue) => {
                                    setBirthDate(newValue);
                                }}
                                renderInput={(params) => <TextField id="birthDate" {...params} className="w-full shadow-none rounded-lg bg-gray-50 text-gray-900 custom-datepicker" />}
                                dayOfWeekFormatter={(day) => `${day}.`}
                            />
                        </LocalizationProvider>
                    </div>

                    <Button type="submit">
                        Editar
                    </Button>
                </form>
            </Card>

        </>
    )
}