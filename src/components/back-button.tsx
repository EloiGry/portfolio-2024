"use client";
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type BackButtonProps = {
    className?: string;
}

export function BackButton({className}: BackButtonProps) {
    const router = useRouter();
    return (
        <button onClick={() => router.back()} className={className}> 
            <ArrowLeft />
        </button>
    )

}