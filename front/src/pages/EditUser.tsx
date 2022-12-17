import { Button, Card, Label, TextInput } from "flowbite-react/lib/esm/components"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/main.css"
import "../styles/datepicker.css"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, {Moment} from 'moment';
moment.locale('pt-br', {
    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : 'há %s',
        s : 'poucos segundos',
        ss : '%d segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/
}); 

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';

import React, { FormEvent, useEffect, useState } from "react";
import {FaUserEdit} from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Root() {
    const [birthDate, setBirthDate] = useState<Moment | null>(null);
    const [name, setName] = useState<string>("")
    const { id } = useParams()

    useEffect(()=>{
        axios.get('http://localhost:3000/users/' + id)
        .then(function (response: any) { 
            setName(response.data.name)
            setBirthDate(moment(response.data.birthDate))
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

            <h1 className="my-10 text-3xl flex items-center justify-center gap-4 font-bold text-gray-900 px-10 flex-wrap text-center">
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
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
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
            
            <Footer/>
        </>
    )
}