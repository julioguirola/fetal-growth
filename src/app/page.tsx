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
import { semanas, calcPercentile } from "@/lib/percentile-curve";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [sex, setSex] = useState<'M' | 'F'>('M')
  const [weeks, setWeeks] = useState<number>(14);
  const [days, setDays] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [percentile, setPercentile] = useState<number | null>(null);

  return (
    <div className="w-svw h-svh flex flex-col items-center justify-center gap-2">
      <h1 className="font-bold text-2xl">Fetal Growth Calculator</h1>
      <div className="flex flex-col w-[90%] p-4 gap-4 items-center">
        <div className="flex item-center gap-4">
          <Select onValueChange={value => {
            setWeeks(Number(value))
            setPercentile(null)
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Semanas" />
            </SelectTrigger>
            <SelectContent className="h-fit">
              {semanas.map(semana => (
                <SelectItem key={semana} value={semana.toString()}>{semana} semanas</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={value => {
              setDays(Number(value))
              setPercentile(null)
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Dias" />
            </SelectTrigger>
            <SelectContent className="h-fit">
              {Array.from({ length: 8 }, (_, i) => i).map(dia => (
                <SelectItem key={dia} value={dia.toString()}>{dia} días</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex item-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Switch onCheckedChange={value => {
                setSex(value ? 'F' : 'M')
                setPercentile(null)
              }} id="sex-switch" />
            <Label htmlFor="sex-switch" className="select-none">{sex === 'M' ? 'Masculino' : 'Femenino'}</Label>
          </div>
          <Label htmlFor="weight-input" className="select-none">Peso (g)</Label>
          <Input id="weight-input" type="number" className="w-35" placeholder="300" min={0} max={5000} onChange={e => {
              setWeight(Number(e.target.value))
              setPercentile(null)
            }} />
        </div>
        <div className="flex item-center gap-4 justify-evenly w-full">
          <span className="text-center">Resultado: {percentile !== null ? `${percentile}%` : "N/A"}</span>
          <Button onClick={() => {
              setPercentile(calcPercentile(sex, weight, weeks, days))
          }
          } className="bg-blue-500">Calcular</Button>
        </div>
      </div>

      <Grafica sex={sex} x={weeks} y={weight} percentile={percentile} />
    </div>
  );
}
