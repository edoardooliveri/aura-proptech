import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ── Registra font monospace (Courier built-in PDF) ────────────
// Per titoli usiamo Helvetica-Bold (built-in), per numeri/code Courier-Bold

const BLACK   = "#000000";
const VOID    = "#080810";
const SURFACE = "#111118";
const SURFACE2= "#1A1A28";
const BLUE    = "#0070F3";
const BLUE_L  = "#2383FF";
const PINK    = "#FF2D78";
const WHITE   = "#FFFFFF";
const GRAY    = "#9090A8";
const GRAY_L  = "#CCCCDD";
const GREEN   = "#00C781";
const BORDER  = "#222233";

function fmt(n: number): string {
  return new Intl.NumberFormat("it-IT").format(n);
}

const S = StyleSheet.create({
  // ── Pages ──────────────────────────────────────────────────
  page: {
    backgroundColor: BLACK,
    padding: 0,
    fontFamily: "Helvetica",
  },

  // ── Layout helpers ─────────────────────────────────────────
  padded: { padding: "40pt 48pt" },
  row:    { flexDirection: "row", alignItems: "center" },
  col:    { flexDirection: "column" },
  flex1:  { flex: 1 },

  // ── Common text ────────────────────────────────────────────
  label: {
    fontSize: 7,
    letterSpacing: 3,
    color: GRAY,
    fontFamily: "Courier-Bold",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  body: { fontSize: 10, color: GRAY_L, lineHeight: 1.7 },
  small: { fontSize: 8, color: GRAY },

  // ── Divider ────────────────────────────────────────────────
  divider: { height: 1, backgroundColor: BORDER, marginVertical: 20 },

  // ── Chip / badge ───────────────────────────────────────────
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: SURFACE2,
    borderWidth: 1,
    borderColor: BORDER,
  },
  chipText: { fontSize: 8, color: GRAY, fontFamily: "Courier-Bold" },
});

// ── Shared header ─────────────────────────────────────────────
function PageHeader({ page, total }: { page: number; total: number }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 48,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            backgroundColor: BLUE,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Text style={{ fontSize: 9, color: BLUE_L, fontFamily: "Courier-Bold", letterSpacing: 1 }}>
          AURA PROPTECH
        </Text>
      </View>
      <Text style={{ fontSize: 8, color: GRAY, fontFamily: "Courier-Bold" }}>
        {page} / {total}  ·  CONFIDENZIALE
      </Text>
    </View>
  );
}

// ── Shared footer ─────────────────────────────────────────────
function PageFooter() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 48,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: BORDER,
      }}
    >
      <Text style={{ fontSize: 7, color: GRAY, fontFamily: "Courier-Bold" }}>
        © 2026 Aura PropTech · Documento generato da Core AI
      </Text>
      <Text style={{ fontSize: 7, color: GRAY, fontFamily: "Courier-Bold" }}>
        auraproptech.io
      </Text>
    </View>
  );
}

// ── ROI Bar Chart ─────────────────────────────────────────────
function BarChart({
  annualLoss,
  auraCostAnnual,
}: {
  annualLoss: number;
  auraCostAnnual: number;
}) {
  const maxWidth = 380;
  const lossWidth = maxWidth;
  const auraWidth = Math.round((auraCostAnnual / annualLoss) * maxWidth);

  return (
    <View style={{ marginTop: 12 }}>
      {/* Loss bar */}
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <Text style={{ fontSize: 8, color: PINK, fontFamily: "Courier-Bold", width: 130 }}>
            SENZA AI · PERDITA ANNUA
          </Text>
          <Text style={{ fontSize: 11, color: PINK, fontFamily: "Courier-Bold" }}>
            − €{fmt(annualLoss)}
          </Text>
        </View>
        <View
          style={{
            width: lossWidth,
            height: 28,
            backgroundColor: PINK,
            borderRadius: 4,
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 8, color: WHITE, fontFamily: "Courier-Bold" }}>
            €{fmt(Math.round(annualLoss / 12))}/mese · {fmt(annualLoss / 12 / 20 / 8 * 100) + "% "}
            del fatturato potenziale bloccato in admin
          </Text>
        </View>
      </View>

      {/* Aura cost bar */}
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
          <Text style={{ fontSize: 8, color: BLUE_L, fontFamily: "Courier-Bold", width: 130 }}>
            CON AURA · COSTO ANNUO
          </Text>
          <Text style={{ fontSize: 11, color: BLUE_L, fontFamily: "Courier-Bold" }}>
            €{fmt(auraCostAnnual)}
          </Text>
        </View>
        <View
          style={{
            width: auraWidth,
            height: 28,
            backgroundColor: BLUE,
            borderRadius: 4,
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 8, color: WHITE, fontFamily: "Courier-Bold" }}>
            €{fmt(Math.round(auraCostAnnual / 12))}/mese
          </Text>
        </View>
      </View>
    </View>
  );
}

// ── Props ─────────────────────────────────────────────────────
export interface PitchData {
  agencyName:     string;
  hoursLostDaily: number;
  agentsCount:    number;
  hoursMonthly:   number;
  valueMonthly:   number;
  valueAnnual:    number;
  auraCostAnnual: number;
  roi:            number;
  qrDataUrl?:     string;
}

// ╔═══════════════════════════════════════════════════════════╗
//  DOCUMENTO PDF
// ╚═══════════════════════════════════════════════════════════╝
export function PitchDocument({ d }: { d: PitchData }) {
  const agency = d.agencyName || "La Tua Agenzia";

  return (
    <Document
      title={`Aura PropTech — Report Inefficienza ${agency}`}
      author="Core AI · Aura PropTech"
      subject="ROI Analysis"
    >

      {/* ══════════════════════════════════════════════════════
          PAGINA 1 — COVER
      ══════════════════════════════════════════════════════ */}
      <Page size="A4" style={S.page}>

        {/* Accent line top */}
        <View style={{ height: 3, backgroundColor: PINK, width: "100%" }} />

        {/* Grid pattern overlay (simulate with lines) */}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                top: (842 / 12) * i,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: "rgba(0,112,243,0.04)",
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                left: (595 / 8) * i,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: "rgba(0,112,243,0.04)",
              }}
            />
          ))}
        </View>

        <PageHeader page={1} total={4} />

        {/* Main content */}
        <View style={{ padding: "60pt 48pt 40pt", flex: 1 }}>

          {/* Tag line */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 48 }}>
            <View style={{ width: 24, height: 1, backgroundColor: PINK }} />
            <Text style={S.label}>REPORT RISERVATO · GENERATO DA CORE AI</Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 11,
              color: GRAY,
              fontFamily: "Courier-Bold",
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            AURA PROPTECH PRESENTA:
          </Text>
          <Text
            style={{
              fontSize: 28,
              color: WHITE,
              fontFamily: "Helvetica-Bold",
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Il Report sull&apos;Inefficienza di
          </Text>
          <Text
            style={{
              fontSize: 36,
              color: PINK,
              fontFamily: "Helvetica-Bold",
              lineHeight: 1.1,
              marginBottom: 40,
            }}
          >
            {agency}
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 13,
              color: GRAY_L,
              lineHeight: 1.6,
              maxWidth: 400,
              marginBottom: 48,
            }}
          >
            Questo documento calcola con precisione quanto denaro e tempo
            la tua agenzia sta perdendo ogni anno senza intelligenza artificiale.
            I numeri potrebbero disturbarti. È necessario che lo facciano.
          </Text>

          {/* KPI summary cards */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 40 }}>
            {[
              { label: "PERDITA ANNUA STIMATA", value: `€ ${fmt(d.valueAnnual)}`, color: PINK },
              { label: "ORE SPRECATE / ANNO", value: `${fmt(d.hoursMonthly * 12)}h`, color: BLUE_L },
              { label: "ROI CON AURA", value: `${d.roi}x`, color: GREEN },
            ].map((k, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: SURFACE,
                  borderRadius: 8,
                  padding: "14pt 16pt",
                  borderTopWidth: 2,
                  borderTopColor: k.color,
                }}
              >
                <Text style={{ ...S.label, marginBottom: 6 }}>{k.label}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: k.color,
                    fontFamily: "Courier-Bold",
                  }}
                >
                  {k.value}
                </Text>
              </View>
            ))}
          </View>

          <View style={S.divider} />

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={S.small}>
              Basato su: {d.agentsCount} agente/i · {d.hoursLostDaily}h perse/giorno/agente · provvigione media €6.000/transazione
            </Text>
            <Text style={S.small}>
              {new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
            </Text>
          </View>
        </View>

        <PageFooter />
      </Page>


      {/* ══════════════════════════════════════════════════════
          PAGINA 2 — IL VERDETTO
      ══════════════════════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        <View style={{ height: 3, backgroundColor: PINK }} />
        <PageHeader page={2} total={4} />

        <View style={{ padding: "40pt 48pt 80pt" }}>
          <Text style={S.label}>IL VERDETTO</Text>

          <Text
            style={{
              fontSize: 22,
              color: WHITE,
              fontFamily: "Helvetica-Bold",
              marginBottom: 6,
            }}
          >
            Il costo reale dell&apos;inefficienza
          </Text>
          <Text style={{ fontSize: 11, color: GRAY, marginBottom: 32 }}>
            Ogni cifra in questo documento è calcolata sui dati reali che hai fornito.
          </Text>

          {/* Big loss number */}
          <View
            style={{
              backgroundColor: SURFACE,
              borderRadius: 12,
              padding: "24pt 28pt",
              marginBottom: 28,
              borderLeftWidth: 4,
              borderLeftColor: PINK,
            }}
          >
            <Text style={S.label}>PERDITA ECONOMICA ANNUA STIMATA</Text>
            <Text
              style={{
                fontSize: 52,
                color: PINK,
                fontFamily: "Courier-Bold",
                letterSpacing: -1,
              }}
            >
              − €{fmt(d.valueAnnual)}
            </Text>
            <Text style={{ fontSize: 11, color: GRAY, marginTop: 6 }}>
              Questo è il valore del lavoro produttivo bloccato in attività amministrative
              che Core AI elimina completamente.
            </Text>
          </View>

          {/* Breakdown table */}
          <Text style={{ ...S.label, marginBottom: 12 }}>CALCOLO DETTAGLIATO</Text>
          <View
            style={{
              backgroundColor: SURFACE,
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            {[
              ["Ore perse al giorno per agente",        `${d.hoursLostDaily}h`],
              ["Agenti nel team",                        `${d.agentsCount}`],
              ["Ore totali perse al giorno (team)",      `${d.hoursLostDaily * d.agentsCount}h`],
              ["Giorni lavorativi / mese",               "20"],
              ["Ore totali perse al mese (team)",        `${fmt(d.hoursMonthly * d.agentsCount)}h`],
              ["Valore ora agente (benchmark italiano)", "€ 150"],
              ["Valore economico perso / mese",          `€ ${fmt(d.valueMonthly * d.agentsCount)}`],
              ["Valore economico perso / anno",          `€ ${fmt(d.valueAnnual)}`],
            ].map(([label, value], i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: i % 2 === 0 ? SURFACE : SURFACE2,
                  borderBottomWidth: i < 7 ? 1 : 0,
                  borderBottomColor: BORDER,
                }}
              >
                <Text style={{ fontSize: 9, color: GRAY_L }}>{label}</Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: i >= 6 ? PINK : WHITE,
                    fontFamily: "Courier-Bold",
                  }}
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>

          {/* Bar chart comparison */}
          <Text style={{ ...S.label, marginBottom: 12 }}>CONFRONTO VISIVO</Text>
          <BarChart annualLoss={d.valueAnnual} auraCostAnnual={d.auraCostAnnual} />

          <View style={{ ...S.divider, marginTop: 24 }} />
          <Text style={{ fontSize: 9, color: GRAY, fontStyle: "italic" }}>
            Nota: il valore €150/h è derivato dal fatturato medio documentato di un agente
            immobiliare italiano senior (fonte: FIAIP 2025).
            I tuoi numeri reali potrebbero essere superiori.
          </Text>
        </View>

        <PageFooter />
      </Page>


      {/* ══════════════════════════════════════════════════════
          PAGINA 3 — LA SOLUZIONE
      ══════════════════════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        <View style={{ height: 3, backgroundColor: BLUE }} />
        <PageHeader page={3} total={4} />

        <View style={{ padding: "40pt 48pt 80pt" }}>
          <Text style={S.label}>LA SOLUZIONE</Text>
          <Text
            style={{
              fontSize: 22,
              color: WHITE,
              fontFamily: "Helvetica-Bold",
              marginBottom: 6,
            }}
          >
            Core AI elimina il problema
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: GRAY,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Non un chatbot. Non un FAQ automatizzato. Un Digital Partner che lavora al posto
            tuo su tutto ciò che non genera fatturato — mentre tu ti concentri sulle trattative.
          </Text>

          {/* Features grid */}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 28 }}
          >
            {[
              { tag: "24/7 · 365gg",     title: "Non dorme mai",          desc: "Risposta a ogni richiesta in < 2 secondi, h24. Nessun lead perso per mancanza di copertura." },
              { tag: "Lead Scoring",      title: "Qualifica i clienti",    desc: "Raccoglie budget, zona, tipo immobile e tempistiche in modo naturale. Lead caldi, non freddi." },
              { tag: "Real-time DB",      title: "Conosce il tuo portfolio",desc: "Connesso in tempo reale al tuo database immobili. Zero allucinazioni, dati sempre aggiornati." },
              { tag: "White Label",       title: "Il tuo brand",           desc: "Il tuo nome, i tuoi colori, la tua personalità. Invisibile quanto vuoi. Zero logo Aura." },
              { tag: "Setup 48h",         title: "Operativo in 2 giorni",  desc: "Nessuna competenza tecnica richiesta. Onboarding guidato, disdici mese per mese." },
              { tag: "Scalabile inf.",    title: "Cresce con te",          desc: "Gestisce centinaia di conversazioni simultanee. Nessun burnout, nessun turno extra." },
            ].map((f, i) => (
              <View
                key={i}
                style={{
                  width: "48%",
                  backgroundColor: SURFACE,
                  borderRadius: 8,
                  padding: "14pt 16pt",
                  borderTopWidth: 2,
                  borderTopColor: BLUE,
                }}
              >
                <Text
                  style={{
                    fontSize: 7,
                    color: BLUE_L,
                    fontFamily: "Courier-Bold",
                    letterSpacing: 1,
                    marginBottom: 5,
                  }}
                >
                  [{f.tag}]
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: WHITE,
                    fontFamily: "Helvetica-Bold",
                    marginBottom: 4,
                  }}
                >
                  {f.title}
                </Text>
                <Text style={{ fontSize: 8, color: GRAY, lineHeight: 1.5 }}>{f.desc}</Text>
              </View>
            ))}
          </View>

          {/* ROI finale */}
          <View
            style={{
              backgroundColor: SURFACE2,
              borderRadius: 10,
              padding: "18pt 24pt",
              flexDirection: "row",
              alignItems: "center",
              gap: 24,
              borderWidth: 1,
              borderColor: BLUE,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={S.label}>RITORNO SULL&apos;INVESTIMENTO</Text>
              <Text
                style={{
                  fontSize: 40,
                  color: GREEN,
                  fontFamily: "Courier-Bold",
                  letterSpacing: -1,
                }}
              >
                {d.roi}x
              </Text>
              <Text style={{ fontSize: 9, color: GRAY, marginTop: 4 }}>
                Per ogni euro investito in Aura, ne recuperi {d.roi}.
              </Text>
            </View>
            <View style={{ width: 1, height: 80, backgroundColor: BORDER }} />
            <View style={{ flex: 1 }}>
              <Text style={S.label}>BREAKEVEN</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: BLUE_L,
                  fontFamily: "Helvetica-Bold",
                  marginBottom: 4,
                }}
              >
                Al primo cliente chiuso con l&apos;AI
              </Text>
              <Text style={{ fontSize: 9, color: GRAY, lineHeight: 1.5 }}>
                Una singola provvigione media (€6.000) copre{" "}
                {Math.round(6000 / (d.auraCostAnnual / 12))} mesi di abbonamento Scale.
              </Text>
            </View>
          </View>
        </View>

        <PageFooter />
      </Page>


      {/* ══════════════════════════════════════════════════════
          PAGINA 4 — CALL TO ACTION
      ══════════════════════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        <View style={{ height: 3, backgroundColor: PINK }} />
        <PageHeader page={4} total={4} />

        <View
          style={{
            padding: "48pt 48pt 80pt",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ ...S.label, textAlign: "center", marginBottom: 8 }}>
            PROSSIMO PASSO
          </Text>
          <Text
            style={{
              fontSize: 26,
              color: WHITE,
              fontFamily: "Helvetica-Bold",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 8,
              maxWidth: 400,
            }}
          >
            Prenota l&apos;installazione
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: PINK,
              fontFamily: "Helvetica-Bold",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Core AI sarà operativo sulla tua agenzia in 48 ore.
          </Text>

          {/* QR Code (optional) */}
          {d.qrDataUrl ? (
            <View
              style={{
                backgroundColor: WHITE,
                padding: 16,
                borderRadius: 16,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <Image
                src={d.qrDataUrl}
                style={{ width: 160, height: 160 }}
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: SURFACE,
                paddingHorizontal: 28,
                paddingVertical: 16,
                borderRadius: 12,
                marginBottom: 20,
                alignItems: "center",
                borderWidth: 1,
                borderColor: BLUE,
              }}
            >
              <Text style={{ fontSize: 14, color: BLUE_L, fontFamily: "Courier-Bold", letterSpacing: 1 }}>
                auraproptech.io/prenota-demo
              </Text>
            </View>
          )}

          <Text
            style={{
              fontSize: 9,
              color: BLUE_L,
              fontFamily: "Courier-Bold",
              letterSpacing: 1,
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            auraproptech.io/prenota-demo
          </Text>

          <View style={{ width: "100%", maxWidth: 420 }}>
            <View style={S.divider} />

            {/* What happens next */}
            <Text style={{ ...S.label, marginBottom: 14, textAlign: "center" }}>
              COSA SUCCEDE DOPO LA PRENOTAZIONE
            </Text>
            {[
              ["Giorno 1",  "Call di 30 minuti per raccogliere i tuoi dati agenzia, brand e portfolio."],
              ["Giorno 2",  "Configurazione Core AI con il tuo nome, colori e sistema immobili."],
              ["Giorno 2–3","Test interno e revisione con il tuo team."],
              ["Giorno 3",  "Core AI va live sul tuo sito. Da questo momento cattura lead 24/7."],
            ].map(([day, text], i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  gap: 12,
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottomWidth: i < 3 ? 1 : 0,
                  borderBottomColor: BORDER,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    color: BLUE_L,
                    fontFamily: "Courier-Bold",
                    width: 55,
                    paddingTop: 1,
                  }}
                >
                  {day}
                </Text>
                <Text style={{ fontSize: 9, color: GRAY_L, flex: 1, lineHeight: 1.5 }}>{text}</Text>
              </View>
            ))}

            <View style={S.divider} />

            <View
              style={{
                backgroundColor: SURFACE,
                borderRadius: 8,
                padding: "14pt 18pt",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 9, color: GRAY }}>
                Disdici quando vuoi · Nessun contratto annuale
              </Text>
              <Text style={{ fontSize: 10, color: BLUE_L, fontFamily: "Courier-Bold" }}>
                Piano Elite: €149/mese + setup
              </Text>
            </View>
          </View>
        </View>

        <PageFooter />
      </Page>

    </Document>
  );
}
