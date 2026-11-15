#!/usr/bin/env python3
"""
Gerador de dados simulados para Vento Norte Health
Cria ECG, PPG e sinais vitais usando NeuroKit2

Uso: python generate.py
Saída: resources/mock/scenarios/*.json, resources/mock/profiles/*.json
"""

import json
import os
from datetime import datetime, timedelta
import random
import sys

try:
    import numpy as np
    import neurokit2 as nk
except ImportError:
    print("Erro: Instale as dependências com: pip install -r requirements.txt")
    sys.exit(1)


class MockDataGenerator:
    def __init__(self, seed=42):
        random.seed(seed)
        np.random.seed(seed)
        self.seed = seed

    def generate_ecg(self, duration_seconds=10, sampling_rate=500):
        """Gera sinal de ECG simulado usando NeuroKit2"""
        try:
            # Simula batimento cardíaco normal
            ecg = nk.ecg_simulate(
                duration=duration_seconds,
                sampling_rate=sampling_rate,
                heart_rate=72,
                method="simple"
            )
            return ecg.tolist()
        except Exception as e:
            print(f"Aviso: ECG não pôde ser gerado ({e}). Usando placeholder.")
            return [0.5 + random.gauss(0, 0.1) for _ in range(duration_seconds * sampling_rate)]

    def generate_ppg(self, duration_seconds=10, sampling_rate=100):
        """Gera sinal de PPG (pulso) simulado"""
        try:
            ppg = nk.ppg_simulate(
                duration=duration_seconds,
                sampling_rate=sampling_rate,
                heart_rate=72,
                method="simple"
            )
            return ppg.tolist()
        except Exception as e:
            print(f"Aviso: PPG não pôde ser gerado ({e}). Usando placeholder.")
            return [0.5 + random.gauss(0, 0.1) for _ in range(duration_seconds * sampling_rate)]

    def generate_vital_series(self, days=30, scenario="normal"):
        """Gera série de 30 dias de sinais vitais"""
        series = []
        base_date = datetime.now() - timedelta(days=days)

        for day in range(days):
            current_date = base_date + timedelta(days=day)

            # Aplicar modificadores por cenário
            modifiers = self._get_scenario_modifiers(scenario)

            entry = {
                "date": current_date.isoformat(),
                "heartRate": max(50, min(150, 72 + random.gauss(0, 5) + modifiers["heart_rate"])),
                "bloodPressure": {
                    "systolic": max(90, min(180, 120 + random.gauss(0, 5) + modifiers["bp_systolic"])),
                    "diastolic": max(60, min(110, 80 + random.gauss(0, 3) + modifiers["bp_diastolic"]))
                },
                "glucose": max(50, min(200, 95 + random.gauss(0, 8) + modifiers["glucose"])),
                "temperature": max(36.0, min(39.0, 37.0 + random.gauss(0, 0.3) + modifiers["temperature"])),
                "sleep": max(4, min(10, 7.5 + random.gauss(0, 0.5) + modifiers["sleep"])),
                "spO2": max(85, min(100, 98 + random.gauss(0, 1) + modifiers["spo2"])),
                "weight": 75 + random.gauss(0, 0.2) + modifiers["weight"],
                "mood": max(1, min(5, 4 + random.gauss(0, 0.5) + modifiers["mood"]))
            }
            series.append(entry)

        return series

    def _get_scenario_modifiers(self, scenario):
        """Retorna modificadores baseados no cenário"""
        modifiers = {
            "normal": {
                "heart_rate": 0, "bp_systolic": 0, "bp_diastolic": 0,
                "glucose": 0, "temperature": 0, "sleep": 0,
                "spo2": 0, "weight": 0, "mood": 0
            },
            "hypoxia": {
                "heart_rate": 15, "bp_systolic": 5, "bp_diastolic": 3,
                "glucose": 10, "temperature": 0.5, "sleep": -1,
                "spo2": -8, "weight": 0, "mood": -1
            },
            "fever": {
                "heart_rate": 10, "bp_systolic": 8, "bp_diastolic": 5,
                "glucose": 15, "temperature": 2.0, "sleep": -2,
                "spo2": -3, "weight": -0.5, "mood": -2
            },
            "stress": {
                "heart_rate": 20, "bp_systolic": 10, "bp_diastolic": 8,
                "glucose": 20, "temperature": 0.8, "sleep": -2.5,
                "spo2": -2, "weight": 0.5, "mood": -3
            },
            "radiation": {
                "heart_rate": 8, "bp_systolic": 5, "bp_diastolic": 3,
                "glucose": 12, "temperature": 1.2, "sleep": -1.5,
                "spo2": -5, "weight": -0.3, "mood": -2
            }
        }
        return modifiers.get(scenario, modifiers["normal"])

    def generate_crew(self):
        """Gera tripulação de exemplo"""
        crew = [
            {
                "id": "astro-1",
                "name": "Cristiano",
                "role": "astronaut",
                "station": "Module A"
            },
            {
                "id": "astro-2",
                "name": "Rita",
                "role": "astronaut",
                "station": "Module B"
            },
            {
                "id": "astro-3",
                "name": "Ruan",
                "role": "astronaut",
                "station": "Module C"
            },
            {
                "id": "commander-1",
                "name": "Comandante",
                "role": "commander",
                "station": "Command"
            }
        ]
        return crew

    def generate_all(self):
        """Gera todos os dados mockados"""
        scenarios = ["normal", "hypoxia", "fever", "stress", "radiation"]
        environments = ["station", "moon", "mars", "remote"]

        output_base = "resources/mock"
        os.makedirs(f"{output_base}/scenarios", exist_ok=True)
        os.makedirs(f"{output_base}/profiles", exist_ok=True)

        # Gerar dados de cenários
        print("Gerando cenários...")
        for scenario in scenarios:
            data = {
                "scenario": scenario,
                "generated_at": datetime.now().isoformat(),
                "seed": self.seed,
                "vitals": self.generate_vital_series(scenario=scenario),
                "ecg_sample": self.generate_ecg()[:500],  # Primeiros 10 segundos
                "ppg_sample": self.generate_ppg()[:100],
                "crew": self.generate_crew()
            }
            filepath = f"{output_base}/scenarios/{scenario}.json"
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"✓ {filepath}")

        # Gerar perfis de ambiente
        print("\nGerando perfis de ambiente...")
        profiles = {
            "station": {
                "name": "Estação Espacial",
                "radiation_baseline": 0.3,
                "communication_delay_ms": 100,
                "gravity": "microgravity"
            },
            "moon": {
                "name": "Lua",
                "radiation_baseline": 1.0,
                "communication_delay_ms": 1300,
                "gravity": "0.165g"
            },
            "mars": {
                "name": "Marte",
                "radiation_baseline": 2.5,
                "communication_delay_ms": 780000,
                "gravity": "0.38g"
            },
            "remote": {
                "name": "Terra Remota",
                "radiation_baseline": 0.027,
                "communication_delay_ms": 0,
                "gravity": "1g"
            }
        }

        for env_key, env_data in profiles.items():
            filepath = f"{output_base}/profiles/{env_key}.json"
            with open(filepath, 'w') as f:
                json.dump(env_data, f, indent=2)
            print(f"✓ {filepath}")

        print("\n✅ Dados mockados gerados com sucesso!")


if __name__ == "__main__":
    seed = int(os.environ.get("MOCK_SEED", 42))
    generator = MockDataGenerator(seed=seed)
    generator.generate_all()
