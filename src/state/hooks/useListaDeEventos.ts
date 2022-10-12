import { useRecoilValue } from "recoil"
import { eventoFiltradosState } from "../seletores"

const useListaDeEventos = () => {
return useRecoilValue(eventoFiltradosState)
}

export default useListaDeEventos