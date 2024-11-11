import { Input } from "@/components/ui/input"

export default function SearchDemo() {
    return (
        <>
            <form className="self-center w-1/4">
                <div className="flex items-center w-full">
                    <Input className="flex flex-1 h-10 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 self-center" placeholder="Type a name to search..." cmdk-input="" autocomplete="off" autocorrect="off" spellcheck="false" aria-autocomplete="list" role="combobox" aria-expanded="true" aria-controls=":Rcm:" aria-labelledby=":RcmH1:" id=":RcmH2:" type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search" className="inline"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </div>
            </form>
        </>
    )
}
