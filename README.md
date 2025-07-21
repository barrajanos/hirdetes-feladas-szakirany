# Profession.hu Hirdetés Feladás - Szakirányú Végzettség Kiegészítés

## 📋 Projekt leírása

Ez a projekt a Profession.hu hirdetés feladási oldalának kiegészítése egy új **"Szakirányú végzettség"** mezővel.

## ✨ Funkciók

- **Feltételes megjelenés**: A szakirányú végzettség mező csak akkor jelenik meg, ha NEM "Általános iskola" van kiválasztva
- **Smooth animáció**: CSS transition effektekkel
- **Eredeti design**: Teljesen illeszkedik a Profession.hu meglévő stílusához
- **Responsive**: Mobil és desktop nézetben is működik

## 🎯 Specifikáció

### Mező jellemzői:
- **Címke**: "SZAKIRÁNYÚ VÉGZETTSÉG:"
- **Típus**: Szabad szöveges input mező
- **Kötelezőség**: Nem kötelező
- **Placeholder**: "Pl.: Informatikai mérnök, Közgazdász, Jogász..."
- **Segítség szöveg**: "Ha szüksége van specifikus szakirányú végzettségre."

### Megjelenési logika:
```javascript
if (végzettség !== "Általános iskola" && végzettség !== "") {
    // Mező megjelenik animációval
} else {
    // Mező eltűnik és kiürül
}
```

## 🚀 Használat

1. Nyissa meg az `index.html` fájlt böngészőben
2. Görgessen le a **"Munkavégzéshez szükséges minimális elvárások"** szekcióhoz
3. Válasszon végzettséget a dropdown menüből
4. Ha nem "Általános iskola"-t választ, megjelenik a szakirányú végzettség mező

## 🛠️ Technikai megvalósítás

### HTML
- Új `div` szakasz a végzettség mező után
- Eredeti Profession.hu form szerkezet követése
- Accessibility támogatás (`aria-live`, label kapcsolatok)

### CSS
- Bootstrap-kompatibilis osztályok
- Profession.hu design system használata
- CSS transitions a smooth animációhoz

### JavaScript
- Event listener a végzettség dropdown-on
- Dinamikus show/hide logika
- Form érték automatikus törlése elrejtéskor

## 📁 Fájlstruktúra

```
├── index.html                          # Fő HTML fájl (módosított Profession.hu oldal)
├── Hirdetés adatai _ Profession.hu_files/  # Asset fájlok (CSS, JS, képek)
├── hirdetes_adatok_demo.html           # Standalone demo oldal
└── README.md                           # Projekt dokumentáció
```

## 🎨 Design rendszer

A projekt teljes mértékben követi a Profession.hu meglévő design nyelvét:
- **Színek**: Eredeti brand színek
- **Tipográfia**: Meglévő font-family és méretek
- **Ikonok**: Font Awesome ikonok
- **Form elemek**: Bootstrap-alapú komponensek
- **Responsive breakpoint-ok**: Mobil-first megközelítés

## ⚡ Teljesítmény

- **Minimális footprint**: Csak néhány sor extra HTML/CSS/JS
- **Lazy loading**: A mező csak szükség esetén jelenik meg
- **Optimalizált animációk**: CSS transitions használata JS animációk helyett

---

**Fejlesztő**: [barrajanos](https://github.com/barrajanos)  
**Utolsó frissítés**: 2025. január 