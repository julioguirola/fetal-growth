"use client";

import Grafica from "@/components/grafica";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { semanas } from "@/lib/percentile-curve";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [sex, setSex] = useState<'M' | 'F'>('M')

  return (
    <div className="w-svw h-svh flex flex-col items-center justify-center gap-2">
      <h1 className="font-bold text-2xl">Fetal Growth</h1>
      <div className="flex flex-col w-[90%] p-8 gap-4 items-center">
        <div className="flex item-center gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Semanas" />
            </SelectTrigger>
            <SelectContent className="h-fit">
              {semanas.map(semana => (
                <SelectItem key={semana} value={semana.toString()}>{semana} semanas</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Dias" />
            </SelectTrigger>
            <SelectContent className="h-fit">
              {Array.from({length: 7}, (_, i) => i + 1).map(dia => (
                <SelectItem key={dia} value={dia.toString()}>{dia} días</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex item-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Switch onCheckedChange={value => setSex(value ? 'F' : 'M')} id="sex-switch" />
            <Label htmlFor="sex-switch" className="select-none">{sex === 'M' ? 'Masculino' : 'Femenino'}</Label>
          </div>
          <Label htmlFor="weight-input" className="select-none">Peso (g)</Label>
          <Input id="weight-input" type="number" className="w-35" placeholder="300" min={0} max={5000}/>
        </div>
      </div>
      <Grafica sex={sex} />
    </div>
  );
}
