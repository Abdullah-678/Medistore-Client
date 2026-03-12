import { authClient } from "@/lib/auth-client";

export default async function Home() {

const session=await authClient.getSession();
console.log(session)
  return (
  <div>
<h1>this is home</h1>
  </div>
  );
}
