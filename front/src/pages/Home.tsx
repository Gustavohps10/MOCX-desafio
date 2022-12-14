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

import React from "react";
import {FiUserPlus} from "react-icons/fi"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Root() {
    const [birthDate, setBirthDate] = React.useState<Dayjs | null>(null);

    function handleSubmit() {
        toast.success("Usuário cadastrado com sucesso", {
            position: toast.POSITION.TOP_CENTER
        })

        toast.error('Ocorreu um erro', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
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
                <FiUserPlus fill="rgba(17,24,39)"/>
                Cadastrar Usuário
            </h1>
            <Card className="max-w-lg my-5 right-0 relative mx-auto">
                <form className="flex flex-col gap-4">
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
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="cpf"
                                value="CPF"
                            />
                        </div>
                        <TextInput
                            id="cpf"
                            type="text"
                            placeholder="123.456.789-10"
                            required={true}
                            shadow={true}
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

                    <Button type="submit" onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                </form>
            </Card>

        </>
    )
}