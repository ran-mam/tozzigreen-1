export interface FactureDetail {
  quantite: number;
  prixUnitaire: number;
  montantHT: number;
  tva: number;
  fne: number;
  taxeCommunale: number;
}

export interface Facture {
  ref: string;
  date?: string;
  montant: string;
  details: FactureDetail;
}

const DATA: Record<string, Facture[]> = {
  "Juin 2026": [
    {
      ref: "1234098",
      date: "10/06/2026",
      montant: "24 300 Ar",
      details: {
        quantite: 10,
        prixUnitaire: 2000,
        montantHT: 20000,
        tva: 4000,
        fne: 100,
        taxeCommunale: 200,
      },
    },
    {
      ref: "1234095",
      date: "26/06/2026",
      montant: "34 300 Ar",
      details: {
        quantite: 15,
        prixUnitaire: 2000,
        montantHT: 30000,
        tva: 6000,
        fne: 150,
        taxeCommunale: 250,
      },
    },
  ],
  "Juillet 2026": [
    {
      ref: "2234098",
      montant: "24 300 Ar",
      details: {
        quantite: 10,
        prixUnitaire: 2000,
        montantHT: 20000,
        tva: 4000,
        fne: 100,
        taxeCommunale: 200,
      },
    },
    {
      ref: "2234095",
      montant: "34 300 Ar",
      details: {
        quantite: 15,
        prixUnitaire: 2000,
        montantHT: 30000,
        tva: 6000,
        fne: 150,
        taxeCommunale: 250,
      },
    },
  ],
};

// Permet de retrouver une facture par sa référence
export function getFactureByRef(ref: string): Facture | undefined {
  for (const bills of Object.values(DATA)) {
    const found = bills.find((b) => b.ref === ref);
    if (found) return found;
  }
  return undefined;
}

export default DATA;