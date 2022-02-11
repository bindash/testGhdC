import { Admin } from "./admin.model";
import { Assuetudes } from "./assuetudes.model";
import { Biometrie } from "./biometrie.model";
import { Const_biologique } from "./const_biologique.model";
import { Parametres } from "./parametres.model";

export interface Patient {
    id: number
    admin: Admin
    nomPrenom: string
    biometrie: Biometrie
    const_biologique: Const_biologique
    parametres: Parametres
    assuetudes: Assuetudes
    disabled: boolean
}