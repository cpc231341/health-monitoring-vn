# Mock series for the Indicadores screen (numpy, seeded) and ECG/PPG strips (NeuroKit2).
import numpy as np
import neurokit2 as nk

MOCK_SEED = 47

def r(a, d=1):
    return [round(float(x), d) for x in a]

def build_series():
    rng = np.random.default_rng(MOCK_SEED)
    S = {}

    def hours(n, step, start):
        return (start + np.arange(n) * step) % 24

    def circ(h):
        return np.sin((h - 10) / 24 * 2 * np.pi)

    # --- heart rate (ring, continuous) ---
    def fc_curve(h):
        base = 63 + 4 * circ(h)
        base = np.where((h >= 23) | (h < 6.5), base - 5, base)
        tr = 26 * np.exp(-((h - 17.5) / 0.7) ** 2)
        meal = 3 * np.exp(-((h - 12.7) / 0.5) ** 2) + 3 * np.exp(-((h - 19.7) / 0.5) ** 2) + 2 * np.exp(-((h - 8.2) / 0.4) ** 2)
        return base + tr + meal

    h24 = hours(48, 0.5, 7.5)
    fc24 = fc_curve(h24) + rng.normal(0, 1.0, 48)
    h7 = hours(84, 2.0, 7.0)
    fc7 = fc_curve(h7) + rng.normal(0, 1.4, 84) + np.repeat(rng.normal(0, 0.8, 7), 12)
    fc30 = np.concatenate([60.5 + 1.6 * np.sin(np.arange(23) / 4.0) + rng.normal(0, 0.8, 23), [60, 59, 61, 60, 62, 61, 61]])
    fc24 = np.clip(fc24, 51, None); fc7 = np.clip(fc7, 51, None); fc30 = np.clip(fc30, 51, None)
    fc24[-1] = fc7[-1] = 61; fc30[-1] = 61
    S["fc"] = {"24h": r(fc24, 0), "7d": r(fc7, 0), "30d": r(fc30, 0)}

    # --- body temperature (ring estimate + manual confirmation) ---
    def tc_curve(h):
        return 36.9 + 0.35 * circ(h - 1.0)

    tc24 = tc_curve(h24) + rng.normal(0, 0.04, 48)
    tc7 = tc_curve(h7) + rng.normal(0, 0.05, 84)
    tc30 = np.concatenate([36.68 + rng.normal(0, 0.07, 23), [36.6, 36.7, 36.6, 36.6, 36.7, 36.7, 36.7]])
    tc24[-1] = tc7[-1] = 36.7; tc30[-1] = 36.7
    S["tc"] = {"24h": r(tc24, 2), "7d": r(tc7, 2), "30d": r(tc30, 2)}

    # --- blood pressure (manual) ---
    sys7 = [116, 118, 115, 119, 117, 118, 118]
    dia7 = [74, 76, 73, 77, 75, 76, 76]
    sys30 = np.concatenate([np.round(116.5 + rng.normal(0, 2.6, 23)), sys7])
    dia30 = np.concatenate([np.round(74.5 + rng.normal(0, 1.9, 23)), dia7])
    S["pa"] = {"7d": [sys7, dia7], "30d": [r(sys30, 0), r(dia30, 0)]}

    # --- fasting glucose (manual) ---
    gl7 = [94, 92, 95, 96, 93, 95, 96]
    gl30 = np.concatenate([np.round(93.5 + rng.normal(0, 2.6, 23)), gl7])
    S["gl"] = {"7d": gl7, "30d": r(gl30, 0)}

    # --- sleep (ring) ---
    sn7 = [7.4, 7.1, 7.6, 6.9, 7.2, 6.7, 6.08]
    sn30 = np.concatenate([np.clip(7.25 + rng.normal(0, 0.42, 23), 5.6, 8.6), sn7])
    S["sn"] = {"7d": sn7, "30d": r(sn30, 2)}

    # --- mood (self report 1-5) ---
    hu7 = [4, 4, 3, 4, 4, 3, 3]
    hu30 = np.concatenate([rng.choice([3, 4, 4, 5, 3, 4], 23), hu7])
    S["hu"] = {"7d": hu7, "30d": [int(x) for x in hu30]}
    return S

def wave_path(sig, width=600, height=70, step=3, pad=6):
    sig = np.asarray(sig, dtype=float)[::step]
    lo, hi = float(sig.min()), float(sig.max())
    ys = height - pad - (sig - lo) / (hi - lo) * (height - 2 * pad)
    xs = np.linspace(0, width, len(sig))
    return "M" + " L".join("%.1f,%.1f" % (x, y) for x, y in zip(xs, ys))

def build_waves():
    ecg = nk.ecg_simulate(duration=6, sampling_rate=250, heart_rate=62, noise=0.01, random_state=MOCK_SEED)
    ppg = nk.ppg_simulate(duration=6, sampling_rate=250, heart_rate=62, random_state=MOCK_SEED)
    return {"ecg": wave_path(ecg), "ppg": wave_path(ppg)}

if __name__ == "__main__":
    import json
    S = build_series(); W = build_waves()
    print({k: {kk: (len(vv) if not isinstance(vv[0], list) else [len(x) for x in vv]) for kk, vv in v.items()} for k, v in S.items()})
    print(len(W["ecg"]), len(W["ppg"]), W["ecg"][:80])
