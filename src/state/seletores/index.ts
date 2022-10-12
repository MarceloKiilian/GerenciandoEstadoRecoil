import { selector } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { filtroDeEventos, listaDeEventosState } from "../atom";

export const eventoFiltradosState = selector({
    key: 'eventoFiltradosState',
    get: ({ get }) => {
        const filtro = get(filtroDeEventos)
        const todosOsEventos = get(listaDeEventosState)
        const eventos = todosOsEventos.filter(evento => {
            if (!filtro.data) {
                return true
            }
            const ehOMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10)
            return ehOMesmoDia
        })
        return eventos
    }
})

export const eventoAsync = selector({
    key: 'eventoAsync',
    get: async () => {
        const respostaHttp = await fetch('http://localhost:8080/eventos')
        const eventosJson: IEvento[] = await respostaHttp.json()
        return eventosJson.map(evento => ({
            ...evento,
            inicio: new Date(evento.inicio),
            fim: new Date(evento.fim)
        }))
    }
})