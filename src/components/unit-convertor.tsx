"use client"; 
import { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};
const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};
export default function UnitConverter() {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(parseFloat(e.target.value));
  };
  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };
  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };
  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields."); 
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg.jpeg")' }}
    >
      <div className="max-w-md w-full p-6 bg-transparent rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-1 text-center">Unit Converter</h1>
        <p className="text-sm mb-8 text-center">
          Convert values between different units.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input-unit">From</Label>
            <Select onValueChange={handleInputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-unit">To</Label>
            <Select onValueChange={handleOutputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              type="number"
              placeholder="Enter value"
              value={inputValue || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
         
          <Button
  type="button"
  className="col-span-2 bg-yellow-400 text-black hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-300"
  onClick={convertValue}
>

            Convert
          </Button>
        </div>
        {/* Display the converted value */}
        <div className="mt-6 text-center">
          <div className="text-4xl font-bold text-black">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-muted-foreground text-black">
            {outputUnit ? outputUnit : "Unit"}
          </div>
        </div>
      </div>
    </div>
  );
}
