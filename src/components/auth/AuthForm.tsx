"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@firebase/auth"
import { AlertCircle, ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react"
import { auth, isFirebaseConfigured } from "@/lib/firebase"

type AuthMode = "create" | "sign-in"

export function AuthForm({ initialMode }: { initialMode: AuthMode }) {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setMessage("")
    if (!auth || !isFirebaseConfigured) {
      setError("Airbase account authentication is not configured in this preview. Add the Firebase public project values listed in .env.example to enable sign-up and sign-in.")
      return
    }
    setBusy(true)
    try {
      if (mode === "create") {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() })
        setMessage("Your Airbase account is ready. Provider execution is not enabled in this preview.")
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
        setMessage("You are signed in to Airbase.")
      }
      window.setTimeout(() => router.push("/dashboard"), 700)
    } catch (caught) {
      const code = (caught as { code?: string }).code
      if (code === "auth/email-already-in-use") setError("An Airbase account already uses this email. Try signing in instead.")
      else if (code === "auth/invalid-credential" || code === "auth/wrong-password") setError("The email or password is not correct.")
      else if (code === "auth/weak-password") setError("Choose a password with at least 6 characters.")
      else if (code === "auth/invalid-email") setError("Enter a valid email address.")
      else setError("We could not complete that request. Check your connection and Firebase Auth setup, then try again.")
    } finally {
      setBusy(false)
    }
  }

  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/[0.04] sm:p-8"><div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="font-charlie-display text-xl font-semibold text-slate-950">{mode === "create" ? "Create your Airbase account" : "Sign in to Airbase"}</h2><p className="mt-1 text-xs text-slate-500">One Airbase identity. No separate provider sign-up for this directory.</p></div></div><form onSubmit={submit} className="space-y-4">{mode === "create" && <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Name</span><input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Your name" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /></label>}<label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /></label><label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Password</span><input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "create" ? "new-password" : "current-password"} placeholder="At least 6 characters" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /></label>{error && <p role="alert" className="flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs leading-5 text-rose-800"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}{message && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">{message}</p>}<button type="submit" disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Working...</> : <>{mode === "create" ? "Create Airbase account" : "Sign in"}<ArrowRight className="h-4 w-4" /></>}</button></form><p className="mt-5 text-center text-xs text-slate-500">{mode === "create" ? "Already have an account?" : "New to Airbase?"} <button onClick={() => { setMode(mode === "create" ? "sign-in" : "create"); setError(""); setMessage("") }} className="font-semibold text-blue-700 hover:text-blue-900">{mode === "create" ? "Sign in" : "Create one"}</button></p>{!isFirebaseConfigured && <div className="mt-5 rounded-xl bg-slate-50 px-3 py-3 text-[11px] leading-5 text-slate-500"><strong className="text-slate-700">Setup needed:</strong> Configure Firebase Email/Password Auth and the six `NEXT_PUBLIC_FIREBASE_*` values in the deployment environment. Public Firebase config is not a server secret.</div>}</div>
}
