import Immutable from "immutable"

import { defaultFields } from "./utils"

export default class SsmParameter extends Immutable.Record({
    ...defaultFields,
    data: Immutable.Map(),
}) {
    
}
