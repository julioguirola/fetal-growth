"use client";

import Grafica from "@/components/grafica";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Home() {
  const [sex, setSex] = useState<'M' | 'F'>('M')



  return (
    <div className="w-svw h-svh flex flex-col items-center justify-center gap-2">
      <Switch onCheckedChange={value => console.log(value)} />
      <Grafica sex={sex} />
    </div>
  );
}
