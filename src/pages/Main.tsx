import { createEffect, createSignal, Match, Show, Switch } from "solid-js"
import LoadingPage from "../components/LoadingPage"
import Dashboard from "./Dashboard"

export default function Main(){

    const [loading, setLoading] = createSignal<boolean>(false)

    createEffect(()=>{
        console.log(loading())
    })

    return(
        <div>
            <Switch>
                <Match when={loading()}>
                    <LoadingPage/>
                </Match>
                <Match when={!loading()}>
                    <Dashboard setLoading={setLoading}/>
                </Match>
            </Switch>
        </div>
    )
}