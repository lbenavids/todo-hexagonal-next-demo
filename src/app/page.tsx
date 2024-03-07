import {redirect} from "next/navigation";
import {initApp} from "@/todo/framework/config/InstancesManager";

export default async function Home() {
    console.log("HOME")
    await initApp()
    redirect("todos")
}
