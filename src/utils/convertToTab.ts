import { Tabs } from "../data/Enums";

export default function convertToTab(s?: string | null, tab?:Tabs): Tabs{
    if(s){
        switch(s){
            case "0": return Tabs.SERVER
            case "1": return Tabs.ADMINS
            case "2": return Tabs.USERS
            default: return Tabs.SERVER
        }
    }
    return Tabs.SERVER
}