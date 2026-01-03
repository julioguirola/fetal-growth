"use client";

import Grafica from "@/components/grafica";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [sex, setSex] = useState<'M' | 'F'>('M')

  return (
    <div className="w-svw h-svh flex flex-col items-center justify-center gap-2">
      <Switch onCheckedChange={value => setSex(value ? 'F' : 'M')} id="sex-switch" />
      <Label htmlFor="sex-switch" className="select-none">{sex === 'M' ? 'Masculino' : 'Femenino'}</Label>
      <Grafica sex={sex} />
    </div>
  );
}
