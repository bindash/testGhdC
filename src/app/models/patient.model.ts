import { Admin } from "./admin.model";
import { Assuetudes } from "./assuetudes.model";
import { Biometrie } from "./biometrie.model";
import { ConstBiologique } from "./constBiologique.model";
import { Parametres } from "./parametres.model";

export interface Patient {
    id: number
    admin: Admin
    nomPrenom: string
    biometrie: Biometrie
    constBiologique: ConstBiologique
    parametres: Parametres
    assuetudes: Assuetudes
}