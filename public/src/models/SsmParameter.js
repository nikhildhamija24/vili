import Immutable from "immutable"
import displayTime from "../lib/displayTime"
import { defaultFields } from "./utils"

export default class SsmParameter extends Immutable.Record({
    ...defaultFields,
    data: Immutable.Map(),
}) {
    
}
