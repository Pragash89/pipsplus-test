// Beginner Trader Foundation Program — 12 modules, 60 lessons, 96 quiz questions
// Plan gating: EXPLORER (1-4), TRADER (5-8), PROFESSIONAL (9-12)

type SubscriptionTier = "EXPLORER" | "TRADER" | "PROFESSIONAL";
type LessonType = "TEXT" | "QUIZ";

interface QuizOption { id: string; text: string; }
interface QuizQuestion { question: string; options: QuizOption[]; correctOption: string; explanation: string; }
interface LessonData { title: string; type: LessonType; duration: number; isFree: boolean; content: string | null; quizQuestions?: QuizQuestion[]; }
interface ModuleData { title: string; planAccess: SubscriptionTier; lessons: LessonData[]; }

export const beginnerCourse = {
  slug: "beginner-trader-foundation",
  title: "Beginner Trader Foundation Program",
  titleAr: "برنامج أساسيات المتداول المبتدئ",
  titleEs: "Programa Fundacional para Traders Principiantes",
  titleFr: "Programme de Base pour Traders Débutants",
  description: "The complete beginner program. Learn what trading really is, how markets operate, how traders lose money, how to read charts, and how to protect your capital. 12 modules, 60 lessons, certificate on completion. Philosophy: capital protection before profit seeking.",
  category: "BASICS" as const,
  level: "BEGINNER" as const,
  isPremium: false,
  isPublished: true,
  totalDuration: 1500,
  totalLessons: 60,
  instructor: "PipsPlus Academy",
  tags: ["beginner", "forex", "trading", "foundation", "risk management", "charts"],
  sortOrder: 1,
  modules: [
    // ─── MODULE 1 ────────────────────────────────────────────────────────────
    {
      title: "Introduction to Trading",
      planAccess: "EXPLORER" as SubscriptionTier,
      lessons: [
        {
          title: "What is Trading",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: true,
          content: `<p>Trading is the act of buying and selling financial assets with the goal of making profit from price movements.</p>
<p>Financial markets constantly change in price. Traders attempt to predict these movements and take positions accordingly.</p>
<h3>Example Assets Traded</h3>
<ul><li>Currencies</li><li>Stocks</li><li>Gold</li><li>Oil</li><li>Stock indices</li><li>Cryptocurrencies</li></ul>
<p>A trader profits when the market moves in the direction they predicted. If the market moves against them, they incur a loss.</p>
<h3>Real Life Analogy</h3>
<blockquote><p>Imagine a vegetable wholesaler. Morning price of onions is $20 per bag. You expect prices to rise due to shortage. You buy 100 bags. Evening price becomes $25. You sell. Profit = $5 × 100 = $500. Trading works similarly, except instead of vegetables you trade financial instruments.</p></blockquote>
<h3>Key Principles</h3>
<ol><li>Supply and demand</li><li>Market expectations</li><li>Economic conditions</li><li>Human psychology</li></ol>
<h3>Key Takeaways</h3>
<ul><li>Trading means buying and selling assets</li><li>Profit comes from price movement</li><li>Markets move due to supply and demand</li><li>Trading requires sound decision making</li></ul>`,
        },
        {
          title: "Who Participates in Financial Markets",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: true,
          content: `<p>Financial markets are not just for individual traders. Understanding who moves markets helps you trade more intelligently.</p>
<h3>Major Market Participants</h3>
<ul><li><strong>Banks</strong> — The largest participants. Major banks process trillions in daily currency and asset transactions.</li><li><strong>Governments and Central Banks</strong> — Control monetary policy, interest rates, and intervene in currency markets.</li><li><strong>Hedge Funds</strong> — Large professional funds that speculate aggressively using complex strategies.</li><li><strong>Corporations</strong> — Businesses that exchange currencies for international trade, influencing market prices.</li><li><strong>Retail Traders</strong> — Individuals trading with personal capital through online brokers.</li></ul>
<h3>Why This Matters</h3>
<p>Retail traders are the smallest participants. Large banks can move markets simply due to the massive size of their transactions. Understanding this helps you follow smart money rather than fight it.</p>
<blockquote><p>When a multinational company converts USD to EUR to pay European suppliers, it creates demand for EUR, which can push EUR/USD higher. Institutional flows create trends that retail traders can identify and trade with.</p></blockquote>`,
        },
        {
          title: "Difference Between Investing and Trading",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Many beginners confuse investing and trading. They are fundamentally different activities with different goals, timeframes, and risk profiles.</p>
<h3>Investing</h3>
<p>Investing focuses on <strong>long-term growth</strong>. An investor buys an asset and holds it for months or years, expecting its value to grow over time.</p>
<blockquote><p>An investor buys shares of a company and holds them for 10 years, earning both capital appreciation and dividends.</p></blockquote>
<h3>Trading</h3>
<p>Trading focuses on <strong>short-term price movements</strong>. A trader buys and sells the same asset within hours, days, or weeks, seeking profit from price fluctuations.</p>
<blockquote><p>A trader buys EUR/USD at 8:00 AM at 1.1000 and sells at 2:00 PM at 1.1050, making 50 pips profit in one day.</p></blockquote>
<h3>Key Differences</h3>
<ul><li><strong>Timeframe:</strong> Investors hold years; traders hold hours to weeks</li><li><strong>Activity:</strong> Investors research fundamentals; traders analyse price charts</li><li><strong>Risk:</strong> Trading carries more short-term risk due to leverage and volatility</li></ul>`,
        },
        {
          title: "Types of Financial Markets",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Financial markets are the arenas where different assets are bought and sold. Each market has its own characteristics, participants, and trading hours.</p>
<h3>The Five Major Markets</h3>
<ul><li><strong>Forex (Foreign Exchange)</strong> — The world's largest market. Currencies traded 24 hours a day, 5 days a week. Daily volume exceeds $7 trillion.</li><li><strong>Stock Market</strong> — Where shares of publicly listed companies are traded. Examples: NYSE, NASDAQ, LSE.</li><li><strong>Commodities Market</strong> — Where raw materials are traded: gold, silver, oil, wheat, coffee.</li><li><strong>Cryptocurrency Market</strong> — Digital assets like Bitcoin and Ethereum. Trades 24/7 with no central authority.</li><li><strong>Indices Market</strong> — Tracks the performance of a group of stocks. Examples: S&amp;P 500, FTSE 100, Nikkei 225.</li></ul>
<h3>Which Market Should Beginners Start With?</h3>
<p>Most beginner traders start with <strong>Forex</strong> because it has the lowest entry barrier, high liquidity, tight spreads, and is available 24/5. This program focuses primarily on Forex trading.</p>`,
        },
        {
          title: "Module 1 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What is trading?", options: [{id:"a",text:"Buying and selling financial assets for profit"},{id:"b",text:"Saving money in a bank account"},{id:"c",text:"Gambling in a casino"},{id:"d",text:"Lending money to others"}], correctOption: "a", explanation: "Trading is buying and selling financial assets with the goal of making profit from price movements." },
            { question: "Which of the following is a financial asset?", options: [{id:"a",text:"Currency"},{id:"b",text:"Gold"},{id:"c",text:"Stock"},{id:"d",text:"All of the above"}], correctOption: "d", explanation: "Currencies, gold, and stocks are all examples of financial assets that can be traded." },
            { question: "Investors usually hold assets for", options: [{id:"a",text:"Minutes"},{id:"b",text:"Hours"},{id:"c",text:"Years"},{id:"d",text:"Seconds"}], correctOption: "c", explanation: "Investing focuses on long-term growth, holding assets for months or years." },
            { question: "Which market trades currencies?", options: [{id:"a",text:"Stock market"},{id:"b",text:"Forex market"},{id:"c",text:"Commodity market"},{id:"d",text:"Cryptocurrency exchange"}], correctOption: "b", explanation: "Forex (Foreign Exchange) is the global marketplace where currencies are traded." },
            { question: "Trading profits come from", options: [{id:"a",text:"Price movement"},{id:"b",text:"Bank interest only"},{id:"c",text:"Dividends only"},{id:"d",text:"Salary"}], correctOption: "a", explanation: "A trader profits when the market moves in the direction they predicted." },
            { question: "Who are retail traders?", options: [{id:"a",text:"Individual traders with personal capital"},{id:"b",text:"Large investment banks"},{id:"c",text:"Government institutions"},{id:"d",text:"Central banks"}], correctOption: "a", explanation: "Retail traders are individuals trading with personal capital through online brokers." },
            { question: "Which of these factors moves financial markets?", options: [{id:"a",text:"Supply and demand"},{id:"b",text:"Weather conditions"},{id:"c",text:"Electricity prices"},{id:"d",text:"Internet speed"}], correctOption: "a", explanation: "Trading is based on supply and demand, market expectations, economic conditions, and human psychology." },
            { question: "Trading requires", options: [{id:"a",text:"Predicting price movements"},{id:"b",text:"Guessing randomly"},{id:"c",text:"Copying others blindly"},{id:"d",text:"Closing your eyes"}], correctOption: "a", explanation: "Trading requires analysis and decision-making to predict price movements." },
          ],
        },
      ],
    },
    // ─── MODULE 2 ────────────────────────────────────────────────────────────
    {
      title: "Understanding the Forex Market",
      planAccess: "EXPLORER" as SubscriptionTier,
      lessons: [
        {
          title: "What is Forex",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Forex stands for <strong>Foreign Exchange</strong>. It is the global marketplace where currencies are traded.</p>
<h3>Scale of the Forex Market</h3>
<ul><li>Daily trading volume exceeds <strong>$7 trillion</strong></li><li>The <strong>largest financial market in the world</strong> — larger than all stock markets combined</li><li>Open 24 hours a day, 5 days a week</li></ul>
<h3>Forex Trading Sessions</h3>
<ul><li><strong>Sydney Session</strong> — Opens 10 PM GMT (Sunday)</li><li><strong>Tokyo Session</strong> — Most active for JPY pairs, 12 AM–9 AM GMT</li><li><strong>London Session</strong> — Highest volume, 8 AM–5 PM GMT</li><li><strong>New York Session</strong> — Second highest volume, 1 PM–10 PM GMT</li></ul>
<p>Every international business transaction requires currency exchange. This constant global demand creates the enormous trading volume that makes forex uniquely liquid.</p>`,
        },
        {
          title: "Currency Pairs",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Currencies are always traded in pairs. You cannot buy one currency without simultaneously selling another.</p>
<h3>Structure of a Currency Pair</h3>
<p>In the pair <strong>EUR/USD</strong>:</p>
<ul><li><strong>EUR</strong> is the base currency — the first currency in the pair</li><li><strong>USD</strong> is the quote currency — the second currency</li><li>If EUR/USD = 1.1000, it means 1 Euro buys 1.10 US Dollars</li></ul>
<blockquote><p>EUR/USD = 1.1050 means you need 1.1050 US Dollars to buy 1 Euro. If the price moves from 1.1000 to 1.1050, the Euro has strengthened. If it moves to 1.0950, the Dollar has strengthened.</p></blockquote>
<h3>Types of Currency Pairs</h3>
<ul><li><strong>Major Pairs</strong> — Always involve USD. Most liquid, lowest spreads. Examples: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD.</li><li><strong>Minor Pairs</strong> — Do not involve USD but include major currencies. Examples: EUR/GBP, EUR/JPY, GBP/JPY.</li><li><strong>Exotic Pairs</strong> — One major currency plus one emerging market currency. Higher spreads. Examples: USD/TRY, EUR/ZAR.</li></ul>
<p>As a beginner, focus exclusively on <strong>Major Pairs</strong>. They have the tightest spreads and most available analysis.</p>`,
        },
        {
          title: "Why Currency Prices Move",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Currency prices are driven by forces of supply and demand. When demand for a currency rises, its price rises. When supply exceeds demand, its price falls.</p>
<h3>Key Drivers of Currency Movements</h3>
<ul><li><strong>Interest Rates</strong> — The most powerful driver. Higher rates attract foreign investment, increasing demand for that currency.</li><li><strong>Inflation</strong> — High inflation erodes purchasing power. Countries with lower inflation typically see their currency appreciate.</li><li><strong>Economic Data</strong> — GDP growth, employment figures, retail sales. Strong data = stronger currency.</li><li><strong>Political Stability</strong> — Political uncertainty causes investors to flee a currency. Stable governments attract investment.</li><li><strong>Trade Balance</strong> — Countries that export more than they import create demand for their currency.</li></ul>
<blockquote><p>If the US releases strong employment data showing 300,000 new jobs (vs 150,000 expected), markets interpret this as a strong economy. The Federal Reserve may raise interest rates. Investors buy USD. EUR/USD falls because USD has strengthened.</p></blockquote>`,
        },
        {
          title: "Major Currency Pairs in Depth",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>As a beginner, you will trade primarily from the major currency pairs. Understanding each pair's characteristics helps you choose the right market.</p>
<h3>The Major Currency Pairs</h3>
<ul><li><strong>EUR/USD</strong> — Most traded pair in the world. Tight spreads, high liquidity. Ideal for beginners.</li><li><strong>GBP/USD (Cable)</strong> — More volatile than EUR/USD. Can move 100+ pips on major news.</li><li><strong>USD/JPY</strong> — Moves predictably with US interest rate expectations. Popular for Asian session traders.</li><li><strong>USD/CHF</strong> — Swiss Franc is considered a safe haven. Often moves inversely to EUR/USD.</li><li><strong>AUD/USD</strong> — Sensitive to commodity prices (gold, iron ore) and China's economy.</li><li><strong>USD/CAD</strong> — Sensitive to oil prices since Canada is a major oil exporter.</li></ul>
<h3>Recommendation for Beginners</h3>
<p>Start with <strong>EUR/USD</strong>. It has the most available analysis, lowest spreads, highest liquidity, and is the easiest to trade due to its stable and predictable movements.</p>`,
        },
        {
          title: "Module 2 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What does Forex stand for?", options: [{id:"a",text:"Foreign Exchange"},{id:"b",text:"Financial Exchange"},{id:"c",text:"Future Exchange"},{id:"d",text:"Fixed Exchange"}], correctOption: "a", explanation: "Forex stands for Foreign Exchange — the global marketplace where currencies are traded." },
            { question: "What does Forex trade?", options: [{id:"a",text:"Stocks"},{id:"b",text:"Bonds"},{id:"c",text:"Currencies"},{id:"d",text:"Metals"}], correctOption: "c", explanation: "The Forex market is specifically for trading currencies." },
            { question: "In EUR/USD, what is EUR?", options: [{id:"a",text:"The base currency"},{id:"b",text:"The quote currency"},{id:"c",text:"The spread currency"},{id:"d",text:"None of the above"}], correctOption: "a", explanation: "EUR is the base currency — the first currency in the pair." },
            { question: "If EUR/USD rises from 1.1000 to 1.1050, what happened?", options: [{id:"a",text:"Euro strengthened against the Dollar"},{id:"b",text:"Dollar strengthened against the Euro"},{id:"c",text:"Both moved equally"},{id:"d",text:"The spread widened"}], correctOption: "a", explanation: "When EUR/USD rises, it takes more dollars to buy one euro — meaning the euro strengthened." },
            { question: "Which factor most powerfully drives currency movements?", options: [{id:"a",text:"Social media trends"},{id:"b",text:"Interest rates"},{id:"c",text:"Stock market prices"},{id:"d",text:"Weather patterns"}], correctOption: "b", explanation: "Interest rates are the most powerful driver of currency movements." },
            { question: "Which is the largest financial market in the world?", options: [{id:"a",text:"Stock market"},{id:"b",text:"Forex market"},{id:"c",text:"Cryptocurrency market"},{id:"d",text:"Bond market"}], correctOption: "b", explanation: "Forex is the largest financial market with over $7 trillion daily volume." },
            { question: "Which session has the highest forex trading volume?", options: [{id:"a",text:"Sydney Session"},{id:"b",text:"Tokyo Session"},{id:"c",text:"London Session"},{id:"d",text:"New York Session"}], correctOption: "c", explanation: "The London Session has the highest volume and the tightest spreads." },
            { question: "Which pair is most recommended for beginners?", options: [{id:"a",text:"USD/TRY"},{id:"b",text:"GBP/JPY"},{id:"c",text:"EUR/USD"},{id:"d",text:"AUD/NZD"}], correctOption: "c", explanation: "EUR/USD is most recommended for beginners due to tight spreads, high liquidity, and abundant analysis." },
          ],
        },
      ],
    },
    // ─── MODULE 3 ────────────────────────────────────────────────────────────
    {
      title: "Trading Platforms and Brokers",
      planAccess: "EXPLORER" as SubscriptionTier,
      lessons: [
        {
          title: "What is a Broker",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A broker is a company that provides retail traders with access to financial markets. Without a broker, individual traders cannot directly participate in the interbank forex market.</p>
<h3>What Brokers Provide</h3>
<ul><li><strong>Market Access</strong> — Connection to live forex markets and price feeds</li><li><strong>Trading Platform</strong> — Software to view charts, place orders, and manage trades</li><li><strong>Leverage</strong> — The ability to control larger positions with smaller capital</li><li><strong>Order Execution</strong> — Processing your buy and sell orders instantly</li></ul>
<h3>Types of Brokers</h3>
<ul><li><strong>Market Makers</strong> — Take the other side of your trade. They create a market for you internally. Wider spreads but often no commissions.</li><li><strong>ECN/STP Brokers</strong> — Route your orders to the interbank market. Very tight spreads but charge a commission per trade. Better for larger traders.</li></ul>
<h3>How to Choose a Safe Broker</h3>
<ul><li>Must be regulated by a reputable authority (FCA, ASIC, CySEC)</li><li>Client funds held in segregated accounts</li><li>Transparent fee structure with no hidden charges</li><li>Fast and reliable withdrawal processing</li></ul>
<p><strong>Warning:</strong> Never use an unregulated broker. Use PipsPlus broker reviews to identify trusted brokers before depositing any money.</p>`,
        },
        {
          title: "Trading Platforms",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>A trading platform is the software that connects you to the markets. It is your primary tool for analysis, order placement, and trade management.</p>
<h3>Common Platform Types</h3>
<ul><li><strong>Web-based Platforms</strong> — Run directly in your browser. No download needed. Accessible from any device.</li><li><strong>Desktop Platforms</strong> — Downloaded and installed on your computer. More feature-rich. Most popular: MetaTrader 4 (MT4) and MetaTrader 5 (MT5).</li><li><strong>Mobile Apps</strong> — Trade from your smartphone. Convenient for monitoring and basic order management.</li></ul>
<h3>MetaTrader 4 and MT5</h3>
<p>MT4 and MT5 are the industry standard platforms used by millions of traders worldwide. They offer advanced charting, automated trading (Expert Advisors), and are supported by almost every forex broker. As a beginner, learning MT4 or MT5 is highly recommended.</p>`,
        },
        {
          title: "Types of Orders",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Every trade you place is submitted to the broker as an order. Understanding the different order types is essential for precise trade execution and risk management.</p>
<h3>Market Order</h3>
<p>A market order executes your trade <strong>immediately at the current market price</strong>.</p>
<blockquote><p>EUR/USD is at 1.1000. You place a market buy order. Your trade opens instantly at approximately 1.1002 (including the spread).</p></blockquote>
<h3>Limit Order</h3>
<p>A limit order executes <strong>only when the price reaches your specified level</strong>.</p>
<blockquote><p>EUR/USD is at 1.1050. You want to buy only if price drops to 1.1000. Place a buy limit at 1.1000. It executes automatically if and when price reaches that level.</p></blockquote>
<h3>Stop Loss and Take Profit</h3>
<ul><li><strong>Stop Loss</strong> — Automatically closes a trade if price moves against you, limiting your loss</li><li><strong>Take Profit</strong> — Automatically closes the trade when your profit target is reached</li></ul>
<p>Always use a stop loss on every trade. This is non-negotiable for capital protection.</p>`,
        },
        {
          title: "How to Choose Your Broker",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Choosing the right broker is one of the most important decisions you will make as a trader.</p>
<h3>The Regulatory Checklist</h3>
<ul><li><strong>FCA</strong> (UK Financial Conduct Authority) — One of the strongest regulators globally</li><li><strong>ASIC</strong> (Australian Securities and Investments Commission) — Highly respected, strict oversight</li><li><strong>CySEC</strong> (Cyprus Securities and Exchange Commission) — EU regulated, good protection</li><li><strong>NFA/CFTC</strong> (USA) — Strict regulations with strong investor protections</li></ul>
<h3>Red Flags to Avoid</h3>
<ul><li>Promises of guaranteed profits or unrealistic returns</li><li>Pressure to deposit more money quickly</li><li>Difficulty or delays when withdrawing funds</li><li>No verifiable regulation or license number</li><li>Anonymous company with no physical address</li></ul>
<p>Use the PipsPlus Broker Reviews section to make an informed choice before depositing any money.</p>`,
        },
        {
          title: "Module 3 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What is the primary role of a broker?", options: [{id:"a",text:"To guarantee profits for traders"},{id:"b",text:"To provide market access and execute orders"},{id:"c",text:"To lend money to traders interest-free"},{id:"d",text:"To predict market direction"}], correctOption: "b", explanation: "Brokers provide market access, price feeds, platforms, and order execution." },
            { question: "Which regulatory body is considered one of the strongest globally?", options: [{id:"a",text:"FSB"},{id:"b",text:"MFSA"},{id:"c",text:"FCA (UK)"},{id:"d",text:"VFSC"}], correctOption: "c", explanation: "The FCA (UK Financial Conduct Authority) is one of the strongest regulators globally." },
            { question: "What is a market order?", options: [{id:"a",text:"An order that executes at a future date"},{id:"b",text:"An order that executes immediately at current price"},{id:"c",text:"An order that waits for a specific price"},{id:"d",text:"An order placed on weekends"}], correctOption: "b", explanation: "A market order executes immediately at the current available market price." },
            { question: "A limit order executes when", options: [{id:"a",text:"You click the button manually"},{id:"b",text:"The price reaches your specified level"},{id:"c",text:"The broker decides to fill it"},{id:"d",text:"The market opens"}], correctOption: "b", explanation: "A limit order only executes when price reaches your predetermined entry level." },
            { question: "What is the purpose of a Stop Loss?", options: [{id:"a",text:"To maximise profits"},{id:"b",text:"To increase leverage"},{id:"c",text:"To automatically close a trade to limit loss"},{id:"d",text:"To open new trades"}], correctOption: "c", explanation: "A stop loss automatically closes your trade if price moves against you by a set amount." },
            { question: "MT4 and MT5 are examples of", options: [{id:"a",text:"Regulatory bodies"},{id:"b",text:"Cryptocurrency exchanges"},{id:"c",text:"Trading platforms"},{id:"d",text:"Types of accounts"}], correctOption: "c", explanation: "MetaTrader 4 and MetaTrader 5 are the world's most popular trading platforms." },
            { question: "Which is a red flag when choosing a broker?", options: [{id:"a",text:"Regulated by FCA"},{id:"b",text:"Segregated client funds"},{id:"c",text:"Guaranteed profit promises"},{id:"d",text:"Multiple trading platforms"}], correctOption: "c", explanation: "No legitimate broker can guarantee profits. This is a major red flag." },
            { question: "Take Profit orders", options: [{id:"a",text:"Increase your risk"},{id:"b",text:"Close a trade when your profit target is reached"},{id:"c",text:"Open new positions automatically"},{id:"d",text:"Require manual intervention"}], correctOption: "b", explanation: "A Take Profit order automatically closes your trade when your predetermined profit target is hit." },
          ],
        },
      ],
    },
    // ─── MODULE 4 ────────────────────────────────────────────────────────────
    {
      title: "Essential Trading Terminology",
      planAccess: "EXPLORER" as SubscriptionTier,
      lessons: [
        {
          title: "Pip — The Unit of Price Movement",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A <strong>pip</strong> stands for <em>Percentage in Point</em>. It is the smallest standard unit of price movement in most currency pairs.</p>
<h3>Understanding Pip Value</h3>
<p>For most currency pairs like EUR/USD, a pip is the <strong>fourth decimal place</strong>.</p>
<blockquote><p>EUR/USD moves from 1.10000 to 1.10010 — that is a movement of 1 pip. EUR/USD moves from 1.10000 to 1.10500 — that is a movement of 50 pips.</p></blockquote>
<h3>Special Case: JPY Pairs</h3>
<p>For pairs involving the Japanese Yen (USD/JPY, EUR/JPY), a pip is the <strong>second decimal place</strong>.</p>
<blockquote><p>USD/JPY moves from 149.00 to 149.01 — that is 1 pip.</p></blockquote>
<h3>Why Pips Matter</h3>
<p>Pips are the universal language of trading. When traders say they made 50 pips today, it means the price moved 50 units in their favour. The actual dollar profit depends on your lot size.</p>`,
        },
        {
          title: "Spread — The Cost of Every Trade",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>The <strong>spread</strong> is the difference between the <strong>buy price (ask)</strong> and the <strong>sell price (bid)</strong>. It is the primary cost of every trade you place.</p>
<h3>How Spreads Work</h3>
<blockquote><p>EUR/USD: Bid = 1.10000, Ask = 1.10020. Spread = 2 pips. When you buy EUR/USD at 1.10020 and immediately close, you sell at 1.10000 — a loss of 2 pips. The price must first move 2 pips in your favour just to break even.</p></blockquote>
<h3>Types of Spreads</h3>
<ul><li><strong>Fixed Spread</strong> — Stays constant regardless of market conditions. Easier to plan costs but usually wider.</li><li><strong>Variable (Floating) Spread</strong> — Changes based on market liquidity and volatility. Tighter during liquid periods, wider during news releases.</li></ul>
<h3>Typical Spreads</h3>
<ul><li>EUR/USD — 0.1 to 1.5 pips (most liquid, lowest spread)</li><li>GBP/USD — 0.5 to 2.5 pips</li><li>Exotic pairs — 5 to 50+ pips (much more expensive)</li></ul>`,
        },
        {
          title: "Lot Size — Controlling Your Trade Volume",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Lot size determines how much of a currency pair you are trading. It directly controls your profit or loss per pip.</p>
<h3>Standard Lot Sizes</h3>
<ul><li><strong>Standard Lot</strong> — 100,000 units. Value per pip: approximately $10 (for USD pairs)</li><li><strong>Mini Lot</strong> — 10,000 units. Value per pip: approximately $1</li><li><strong>Micro Lot</strong> — 1,000 units. Value per pip: approximately $0.10</li></ul>
<h3>Practical Example</h3>
<blockquote><p>You buy 1 standard lot EUR/USD. Price moves 50 pips in your favour. Profit = 50 × $10 = $500. With 1 micro lot: Profit = 50 × $0.10 = $5.</p></blockquote>
<h3>Recommendation for Beginners</h3>
<p>Start with <strong>micro lots</strong> (0.01 on MT4/MT5). This allows you to practise real trading with live prices while risking very small amounts. Never start with standard lots as a beginner.</p>`,
        },
        {
          title: "Leverage — Power and Responsibility",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Leverage allows you to control a large position with a small amount of capital. It is one of the most powerful — and most misunderstood — concepts in trading.</p>
<h3>How Leverage Works</h3>
<blockquote><p>With 1:100 leverage, $100 of your own money controls a $10,000 position. You only need to deposit a fraction of the total trade value — this deposit is called margin.</p></blockquote>
<h3>The Double-Edged Sword</h3>
<p>Leverage amplifies both profits <strong>and losses</strong> equally.</p>
<ul><li>Without leverage: You invest $1,000. Price moves 1%. Profit = $10.</li><li>With 1:100 leverage: You control $100,000. Price moves 1%. Profit = $1,000. But if it moves against you 1%, loss = $1,000 — your entire account.</li></ul>
<blockquote><p>Leverage is like a lever lifting heavy objects. Small force moves a large weight — but the lever can also knock something over if used carelessly. Treat leverage with respect.</p></blockquote>
<h3>Recommended Leverage for Beginners</h3>
<p>Use <strong>maximum 1:10 leverage</strong> as a beginner. Professional traders often use 1:2 to 1:5 to protect their capital.</p>`,
        },
        {
          title: "Module 4 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What does pip stand for?", options: [{id:"a",text:"Price in Points"},{id:"b",text:"Percentage in Point"},{id:"c",text:"Profit in Proportion"},{id:"d",text:"Price Interest Point"}], correctOption: "b", explanation: "Pip stands for Percentage in Point — the smallest standard unit of price movement." },
            { question: "For EUR/USD, a pip is located at which decimal place?", options: [{id:"a",text:"First decimal"},{id:"b",text:"Second decimal"},{id:"c",text:"Third decimal"},{id:"d",text:"Fourth decimal"}], correctOption: "d", explanation: "For most pairs including EUR/USD, a pip is the fourth decimal place (0.0001)." },
            { question: "The spread is", options: [{id:"a",text:"The daily price range"},{id:"b",text:"The difference between bid and ask price"},{id:"c",text:"The leverage ratio"},{id:"d",text:"The broker's fixed commission"}], correctOption: "b", explanation: "The spread is the difference between the buy price (ask) and sell price (bid)." },
            { question: "A standard lot equals", options: [{id:"a",text:"1,000 units"},{id:"b",text:"10,000 units"},{id:"c",text:"100,000 units"},{id:"d",text:"1,000,000 units"}], correctOption: "c", explanation: "A standard lot equals 100,000 units of the base currency." },
            { question: "Which lot size is recommended for absolute beginners?", options: [{id:"a",text:"Standard lot (100,000 units)"},{id:"b",text:"Mini lot (10,000 units)"},{id:"c",text:"Micro lot (1,000 units)"},{id:"d",text:"Any size is fine"}], correctOption: "c", explanation: "Micro lots allow beginners to trade with live prices while risking very small amounts." },
            { question: "With 1:100 leverage, $500 controls a position of", options: [{id:"a",text:"$500"},{id:"b",text:"$5,000"},{id:"c",text:"$50,000"},{id:"d",text:"$500,000"}], correctOption: "c", explanation: "$500 × 100 = $50,000 position controlled with 1:100 leverage." },
            { question: "Leverage amplifies", options: [{id:"a",text:"Only profits"},{id:"b",text:"Only losses"},{id:"c",text:"Both profits and losses equally"},{id:"d",text:"Neither profits nor losses"}], correctOption: "c", explanation: "Leverage is a double-edged sword — it amplifies both profits and losses equally." },
            { question: "What leverage is recommended for beginners?", options: [{id:"a",text:"1:500"},{id:"b",text:"1:200"},{id:"c",text:"1:100"},{id:"d",text:"1:10 or lower"}], correctOption: "d", explanation: "Beginners should use maximum 1:10 leverage. Professional traders often use even less." },
          ],
        },
      ],
    },
    // ─── MODULE 5 ────────────────────────────────────────────────────────────
    {
      title: "Margin and Risk",
      planAccess: "TRADER" as SubscriptionTier,
      lessons: [
        {
          title: "What is Margin",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p><strong>Margin</strong> is the amount of money required in your account to open and maintain a leveraged position. Think of it as a security deposit — not a fee, but collateral held aside.</p>
<h3>How Margin is Calculated</h3>
<blockquote><p>Leverage = 1:100. You want to open a $10,000 EUR/USD position. Required margin = $10,000 ÷ 100 = $100. Your account needs at least $100 available to open this trade.</p></blockquote>
<h3>Key Terms</h3>
<ul><li><strong>Used Margin</strong> — The amount currently locked in open positions as collateral</li><li><strong>Free Margin</strong> — The amount available to open new trades (Equity minus Used Margin)</li><li><strong>Margin Level</strong> — (Equity ÷ Used Margin) × 100. Above 100% means you have more equity than margin used.</li></ul>`,
        },
        {
          title: "Margin Call and Stop Out",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>A <strong>margin call</strong> occurs when your account equity falls dangerously close to the margin being used. It is your broker's warning that you need to act immediately.</p>
<h3>How It Happens</h3>
<blockquote><p>You deposit $1,000 and open a trade requiring $100 margin. The trade moves against you. Equity drops to $120. Margin level = ($120 ÷ $100) × 100 = 120%. Most brokers issue a margin call at 100% margin level.</p></blockquote>
<h3>What Happens During a Margin Call</h3>
<ul><li>The broker alerts you to deposit more funds or close positions</li><li>If you don't act, the broker automatically closes your trades (Stop Out)</li><li>Most brokers stop out at 50% margin level</li></ul>
<h3>How to Avoid Margin Calls</h3>
<ul><li>Never risk more than 2% of your account on any single trade</li><li>Use stop loss orders on every position</li><li>Never open too many trades simultaneously</li><li>Monitor your margin level when trades are open</li></ul>`,
        },
        {
          title: "Stop Loss — Your Financial Safety Net",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A <strong>stop loss</strong> is an order placed at a specific price level that automatically closes your trade if the price moves against you. It is the single most important risk management tool available.</p>
<h3>How Stop Loss Works</h3>
<blockquote><p>You buy EUR/USD at 1.1000. You place a stop loss at 1.0970. If price falls to 1.0970, your position closes automatically. Maximum loss = 30 pips. No matter how far price falls after that, your loss is locked in.</p></blockquote>
<h3>Why Stop Loss is Non-Negotiable</h3>
<ul><li>Markets can move extremely fast, especially during news releases</li><li>Without a stop loss, a single trade can wipe out your entire account</li><li>Professional traders always use stop losses — no exceptions</li><li>It removes emotion from losing trades — the trade closes automatically</li></ul>
<h3>The Golden Rule</h3>
<p>Never move your stop loss further away from your entry to avoid being stopped out. Accept the small loss, protect your capital, and look for the next opportunity.</p>`,
        },
        {
          title: "Take Profit — Locking in Your Gains",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>A <strong>take profit</strong> order automatically closes your trade when the price reaches your predetermined profit target.</p>
<h3>How Take Profit Works</h3>
<blockquote><p>You buy EUR/USD at 1.1000. You set a take profit at 1.1060. When price reaches 1.1060, your position closes automatically and you bank 60 pips profit — without needing to watch the screen.</p></blockquote>
<h3>Risk to Reward Ratio</h3>
<p>Always plan your take profit in relation to your stop loss:</p>
<ul><li>Stop loss = 30 pips. Take profit = 90 pips. Risk:Reward = 1:3</li><li>Aim for minimum 1:2 risk-to-reward on every trade</li><li>With 1:2 R:R you only need to win 34% of trades to be profitable</li></ul>
<h3>Why Traders Skip Take Profit (and Why They Shouldn't)</h3>
<p>Greed often prevents traders from using take profit orders — they think the price will keep going. Usually the price reverses, turning a winning trade into a losing one. A take profit removes this emotional trap.</p>`,
        },
        {
          title: "Module 5 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What is margin in trading?", options: [{id:"a",text:"A broker's profit on each trade"},{id:"b",text:"The collateral required to open a leveraged position"},{id:"c",text:"The daily trading fee"},{id:"d",text:"The maximum loss allowed"}], correctOption: "b", explanation: "Margin is the collateral — a security deposit — required to open and maintain a leveraged position." },
            { question: "With 1:50 leverage, to open a $5,000 position you need margin of", options: [{id:"a",text:"$5,000"},{id:"b",text:"$500"},{id:"c",text:"$100"},{id:"d",text:"$50"}], correctOption: "c", explanation: "$5,000 ÷ 50 = $100 required margin." },
            { question: "A margin call occurs when", options: [{id:"a",text:"You make a large profit"},{id:"b",text:"Your account equity falls dangerously close to used margin"},{id:"c",text:"You open too many positions"},{id:"d",text:"The market is closed"}], correctOption: "b", explanation: "A margin call is triggered when equity approaches the used margin level." },
            { question: "Stop Out is", options: [{id:"a",text:"A voluntary exit from the market"},{id:"b",text:"The broker automatically closing positions when margin is depleted"},{id:"c",text:"A type of limit order"},{id:"d",text:"A deposit bonus"}], correctOption: "b", explanation: "Stop Out is the broker's automatic closure of your positions to prevent negative balance." },
            { question: "What does a Stop Loss order do?", options: [{id:"a",text:"Maximises your profit"},{id:"b",text:"Automatically opens new trades"},{id:"c",text:"Automatically closes a trade to limit loss at a preset level"},{id:"d",text:"Increases your leverage"}], correctOption: "c", explanation: "A stop loss automatically closes your trade when price moves against you by your set amount." },
            { question: "Where should you NEVER move your stop loss?", options: [{id:"a",text:"Behind support levels"},{id:"b",text:"Further away from entry to avoid being stopped out"},{id:"c",text:"Closer to entry as trade develops"},{id:"d",text:"Below previous lows"}], correctOption: "b", explanation: "Moving a stop loss further away to avoid being stopped out leads to much larger losses." },
            { question: "A Take Profit order", options: [{id:"a",text:"Closes your trade automatically when profit target is reached"},{id:"b",text:"Increases your position size"},{id:"c",text:"Delays your trade execution"},{id:"d",text:"Requires manual closing"}], correctOption: "a", explanation: "A Take Profit order automatically closes your trade when your predetermined profit target is hit." },
            { question: "A 1:2 risk-to-reward means", options: [{id:"a",text:"You risk $2 to make $1"},{id:"b",text:"You risk $1 to make $2"},{id:"c",text:"You always win twice"},{id:"d",text:"You double your leverage"}], correctOption: "b", explanation: "1:2 R:R means for every $1 you risk, you aim to make $2 in profit." },
          ],
        },
      ],
    },
    // ─── MODULE 6 ────────────────────────────────────────────────────────────
    {
      title: "Reading Price Charts",
      planAccess: "TRADER" as SubscriptionTier,
      lessons: [
        {
          title: "Introduction to Charts",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A price chart is the visual representation of a market's price history over time. Every trading decision starts with reading a chart correctly.</p>
<h3>The Three Main Chart Types</h3>
<ul><li><strong>Line Chart</strong> — Connects closing prices with a single line. Good for seeing the overall trend but provides minimal detail.</li><li><strong>Bar Chart (OHLC)</strong> — Each bar shows Opening, High, Low, and Closing price for a time period. More information than line charts.</li><li><strong>Candlestick Chart</strong> — The most popular chart type. Same information as bar charts but displayed as visual candles that are easier to interpret at a glance.</li></ul>
<h3>Chart Timeframes</h3>
<ul><li><strong>M1, M5, M15</strong> — Minute charts. Used by scalpers.</li><li><strong>H1, H4</strong> — Hourly charts. Popular for intraday trading.</li><li><strong>D1</strong> — Daily chart. One candle per day. Ideal for swing traders.</li><li><strong>W1, MN</strong> — Weekly and monthly charts. Used for long-term analysis.</li></ul>
<p>Beginners should start with the <strong>Daily (D1) and H4 charts</strong>. They filter out market noise and require less screen time.</p>`,
        },
        {
          title: "Candlestick Charts",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Candlestick charts originated in Japan over 200 years ago. Today they are the universal standard for financial market analysis worldwide.</p>
<h3>Anatomy of a Candlestick</h3>
<ul><li><strong>Open</strong> — The price when the period began</li><li><strong>Close</strong> — The price when the period ended</li><li><strong>High</strong> — The highest price reached during the period</li><li><strong>Low</strong> — The lowest price reached during the period</li><li><strong>Body</strong> — The rectangle between open and close</li><li><strong>Wick/Shadow</strong> — The thin lines showing the high and low extremes</li></ul>
<h3>Bullish vs Bearish Candles</h3>
<ul><li><strong>Bullish Candle (Green)</strong> — Close is higher than open. Buyers were in control.</li><li><strong>Bearish Candle (Red)</strong> — Close is lower than open. Sellers were in control.</li></ul>
<h3>Reading Candle Size</h3>
<ul><li>Large body = strong momentum in that direction</li><li>Long upper wick = price was pushed higher but sellers rejected it</li><li>Long lower wick = price was pushed lower but buyers stepped in</li></ul>`,
        },
        {
          title: "Key Candlestick Patterns",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Certain candlestick formations have predictive value for future price direction. Recognising these patterns is a foundational skill for all traders.</p>
<h3>Single Candle Patterns</h3>
<ul><li><strong>Doji</strong> — Open and close are almost equal. Tiny body. Signals indecision and often marks reversals after a strong trend.</li><li><strong>Hammer</strong> — Small body at the top with a long lower wick. Appears at the bottom of downtrends. Signals potential bullish reversal.</li><li><strong>Shooting Star</strong> — Small body at the bottom with a long upper wick. Appears at the top of uptrends. Signals potential bearish reversal.</li></ul>
<h3>Two-Candle Patterns</h3>
<ul><li><strong>Bullish Engulfing</strong> — A large green candle completely engulfs the previous red candle. Signals strong bullish reversal.</li><li><strong>Bearish Engulfing</strong> — A large red candle completely engulfs the previous green candle. Signals strong bearish reversal.</li></ul>
<p>Never trade candlestick patterns in isolation. They must be confirmed by context — the trend direction and key support/resistance levels.</p>`,
        },
        {
          title: "Choosing Your Timeframe",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Your choice of timeframe determines your trading style and how much time you spend watching charts.</p>
<h3>Timeframe and Trading Style</h3>
<ul><li><strong>Scalping (M1-M15)</strong> — Many trades per day, 5-20 pips per trade. Requires full-time screen attention.</li><li><strong>Day Trading (M15-H1)</strong> — Multiple trades per day, all closed before day ends. Requires several hours of active monitoring.</li><li><strong>Swing Trading (H4-D1)</strong> — Holds trades for 1-10 days. Ideal for those who cannot watch screens all day.</li><li><strong>Position Trading (W1-MN)</strong> — Holds trades for weeks or months. Based on fundamental analysis and long-term trends.</li></ul>
<h3>The Multi-Timeframe Approach</h3>
<ol><li>Higher timeframe (D1 or W1) — Identify the main trend</li><li>Medium timeframe (H4) — Find the entry zone</li><li>Lower timeframe (H1 or M15) — Time the precise entry</li></ol>
<p>This prevents you from trading counter to the main trend, which is the most common beginner mistake.</p>`,
        },
        {
          title: "Module 6 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "Which chart type is most popular among professional traders?", options: [{id:"a",text:"Line chart"},{id:"b",text:"Bar chart"},{id:"c",text:"Candlestick chart"},{id:"d",text:"Point and figure chart"}], correctOption: "c", explanation: "Candlestick charts are the universal standard used by professional traders worldwide." },
            { question: "A bullish candlestick means", options: [{id:"a",text:"The closing price was lower than the open"},{id:"b",text:"The closing price was higher than the open"},{id:"c",text:"The price did not move"},{id:"d",text:"Sellers were in control"}], correctOption: "b", explanation: "A bullish (green) candle means the closing price was higher than the opening price." },
            { question: "What does OHLC stand for?", options: [{id:"a",text:"Open, High, Low, Close"},{id:"b",text:"Order, Hold, Limit, Cancel"},{id:"c",text:"Only Highest, Lowest, Candlestick"},{id:"d",text:"Open, Hold, Leverage, Close"}], correctOption: "a", explanation: "OHLC stands for Open, High, Low, Close — the four data points shown in bar and candlestick charts." },
            { question: "A Doji candlestick signals", options: [{id:"a",text:"Strong buying pressure"},{id:"b",text:"Strong selling pressure"},{id:"c",text:"Market indecision"},{id:"d",text:"End of all trends"}], correctOption: "c", explanation: "A Doji has open and close at nearly the same level, signalling market indecision." },
            { question: "Which timeframe is most recommended for beginners?", options: [{id:"a",text:"M1 (1-minute)"},{id:"b",text:"M5 (5-minute)"},{id:"c",text:"D1 (daily) and H4"},{id:"d",text:"Tick charts"}], correctOption: "c", explanation: "D1 and H4 charts filter out noise, provide clearer signals, and require less screen time." },
            { question: "A long lower wick on a candlestick indicates", options: [{id:"a",text:"Price closed at the low"},{id:"b",text:"Buyers pushed price back up after sellers tried to push it lower"},{id:"c",text:"Strong bearish momentum"},{id:"d",text:"The market was closed"}], correctOption: "b", explanation: "A long lower wick shows that sellers pushed price down but buyers stepped in strongly to recover it." },
            { question: "Swing trading typically holds positions for", options: [{id:"a",text:"Seconds to minutes"},{id:"b",text:"Hours only"},{id:"c",text:"1 to 10 days"},{id:"d",text:"Years"}], correctOption: "c", explanation: "Swing trading holds positions for 1-10 days, targeting larger price movements." },
            { question: "The multi-timeframe approach involves", options: [{id:"a",text:"Trading all timeframes simultaneously"},{id:"b",text:"Using higher timeframes for trend direction, lower timeframes for entry timing"},{id:"c",text:"Using only one timeframe"},{id:"d",text:"Changing timeframes randomly"}], correctOption: "b", explanation: "Multi-timeframe analysis uses the higher timeframe for trend, medium for zone, lower for entry." },
          ],
        },
      ],
    },
    // ─── MODULE 7 ────────────────────────────────────────────────────────────
    {
      title: "Market Structure",
      planAccess: "TRADER" as SubscriptionTier,
      lessons: [
        {
          title: "Understanding Uptrends",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A market doesn't move in a straight line. It moves in a series of peaks and troughs — waves. Understanding how these waves are structured is the foundation of technical analysis.</p>
<h3>Uptrend Definition</h3>
<p>An uptrend is characterised by:</p>
<ul><li><strong>Higher Highs (HH)</strong> — Each peak is higher than the previous peak</li><li><strong>Higher Lows (HL)</strong> — Each trough is higher than the previous trough</li></ul>
<blockquote><p>Imagine price moving like climbing stairs. Each step up (higher high) is followed by a small pullback (higher low) before the next step up. As long as each pullback stays above the previous one, the uptrend is intact.</p></blockquote>
<h3>Trading Uptrends</h3>
<ul><li>The golden rule: <strong>Trade with the trend, not against it</strong></li><li>Buy during pullbacks to higher lows — when price dips and then shows signs of resuming upward</li><li>Do not short (sell) a strongly trending market</li></ul>
<h3>End of an Uptrend</h3>
<p>An uptrend ends when the market creates a <strong>Lower Low</strong> — when a pullback breaks below the previous higher low. This signals sellers are gaining control.</p>`,
        },
        {
          title: "Understanding Downtrends",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A downtrend is the mirror image of an uptrend. Understanding it allows you to either avoid losses by not fighting the trend, or profit by trading in the direction of price movement.</p>
<h3>Downtrend Definition</h3>
<ul><li><strong>Lower Highs (LH)</strong> — Each peak is lower than the previous peak</li><li><strong>Lower Lows (LL)</strong> — Each trough is lower than the previous trough</li></ul>
<blockquote><p>Price moves like a staircase going down. Each rally higher (lower high) fails to reach the previous peak, then price makes a new low. The pattern of lower highs and lower lows confirms the downtrend.</p></blockquote>
<h3>Key Insight</h3>
<p>Most trading losses happen when traders buy into a downtrend hoping the bottom is in. Always identify the trend direction first. Trade <strong>with</strong> the market, not against it.</p>`,
        },
        {
          title: "Sideways Markets (Ranging)",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Not all markets trend. A large portion of the time, markets move sideways — bouncing between a ceiling and a floor without making significant new highs or lows.</p>
<h3>Characteristics of a Ranging Market</h3>
<ul><li>Price oscillates between a defined upper level (resistance) and lower level (support)</li><li>No clear higher highs/higher lows or lower highs/lower lows pattern</li><li>Candlesticks frequently overlap</li><li>Moving averages flatten out horizontally</li></ul>
<h3>How to Trade a Range</h3>
<ul><li><strong>Buy at Support</strong> — When price reaches the bottom of the range and shows reversal signals</li><li><strong>Sell at Resistance</strong> — When price reaches the top of the range and shows reversal signals</li></ul>
<h3>Breakouts</h3>
<p>When price finally breaks out of the range, it often moves strongly in the breakout direction. Wait for a strong candle to close beyond the range boundary before entering.</p>`,
        },
        {
          title: "Identifying Trend Strength",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Not all trends are equal. A strong trend offers high-probability trade opportunities. A weak trend is prone to reversal and choppy price action.</p>
<h3>Signs of a Strong Trend</h3>
<ul><li>Large, clear candlestick bodies in the trend direction</li><li>Small pullbacks that barely retrace (less than 38% of the prior move)</li><li>Price consistently staying above (uptrend) or below (downtrend) moving averages</li></ul>
<h3>Signs of a Weakening Trend</h3>
<ul><li>Pullbacks becoming larger and deeper</li><li>Price struggling to make new highs or lows</li><li>Long wicks opposing the trend direction appearing on candles</li></ul>
<h3>Using Moving Averages</h3>
<ul><li>Price above 200 MA = long-term uptrend — look for buy opportunities</li><li>Price below 200 MA = long-term downtrend — look for sell opportunities</li><li>50 MA crossing above 200 MA = Golden Cross (bullish signal)</li><li>50 MA crossing below 200 MA = Death Cross (bearish signal)</li></ul>`,
        },
        {
          title: "Module 7 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "An uptrend is defined by", options: [{id:"a",text:"Lower highs and lower lows"},{id:"b",text:"Higher highs and higher lows"},{id:"c",text:"Flat price movement"},{id:"d",text:"Random price movement"}], correctOption: "b", explanation: "An uptrend consists of Higher Highs (HH) and Higher Lows (HL)." },
            { question: "In an uptrend, you should primarily look for", options: [{id:"a",text:"Selling opportunities"},{id:"b",text:"Buying opportunities during pullbacks"},{id:"c",text:"Exiting all positions"},{id:"d",text:"Ignoring the market"}], correctOption: "b", explanation: "In an uptrend, buy during pullbacks to higher lows when price shows signs of resuming upward." },
            { question: "An uptrend ends when", options: [{id:"a",text:"The price reaches $100"},{id:"b",text:"A lower low is created — when a pullback breaks below the previous higher low"},{id:"c",text:"A new higher high is made"},{id:"d",text:"Volume increases"}], correctOption: "b", explanation: "An uptrend is broken when price creates a Lower Low, signalling sellers gaining control." },
            { question: "A downtrend is defined by", options: [{id:"a",text:"Higher highs and higher lows"},{id:"b",text:"Lower highs and lower lows"},{id:"c",text:"Horizontal price movement"},{id:"d",text:"Increasing volume only"}], correctOption: "b", explanation: "A downtrend consists of Lower Highs (LH) and Lower Lows (LL)." },
            { question: "A ranging market is characterised by", options: [{id:"a",text:"Strong directional moves"},{id:"b",text:"Price bouncing between defined support and resistance levels"},{id:"c",text:"Only upward movement"},{id:"d",text:"Unpredictable random movement"}], correctOption: "b", explanation: "A ranging market oscillates between a support floor and resistance ceiling without trending." },
            { question: "Where should you look to buy in a ranging market?", options: [{id:"a",text:"At resistance levels"},{id:"b",text:"At support levels"},{id:"c",text:"In the middle of the range"},{id:"d",text:"Only after the range breaks"}], correctOption: "b", explanation: "In a range, buy near support where price has historically bounced upward." },
            { question: "The 200-period moving average helps identify", options: [{id:"a",text:"The exact entry point"},{id:"b",text:"The long-term trend direction"},{id:"c",text:"The daily range"},{id:"d",text:"The spread amount"}], correctOption: "b", explanation: "Price above the 200 MA signals a long-term uptrend; below signals a downtrend." },
            { question: "A Golden Cross occurs when", options: [{id:"a",text:"Price reaches a new all-time high"},{id:"b",text:"50 MA crosses above the 200 MA — a bullish signal"},{id:"c",text:"50 MA crosses below the 200 MA"},{id:"d",text:"The market closes at the high"}], correctOption: "b", explanation: "A Golden Cross is when the 50-period MA crosses above the 200-period MA — bullish signal." },
          ],
        },
      ],
    },
    // ─── MODULE 8 ────────────────────────────────────────────────────────────
    {
      title: "Support and Resistance",
      planAccess: "TRADER" as SubscriptionTier,
      lessons: [
        {
          title: "What is Support",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Support is a price level where <strong>buying pressure consistently prevents further price decline</strong>. It acts like a floor beneath the market.</p>
<h3>Why Support Exists</h3>
<p>Support forms because traders remember specific price levels. When price reaches a level where buyers previously stepped in strongly, those traders (and new ones who missed the move) are ready to buy again, creating demand that stops the price from falling.</p>
<h3>How to Identify Support Levels</h3>
<ul><li>Areas where price has bounced upward at least twice before</li><li>Previous lows often become support levels</li><li>Round numbers (1.1000, 1.1500) act as support due to psychological significance</li><li>Previous resistance often becomes support after price breaks above it</li></ul>
<blockquote><p>EUR/USD repeatedly bounces at 1.0900. Each time price touches 1.0900, it rises. The more times price touches and bounces from a level without breaking it, the stronger that support becomes.</p></blockquote>`,
        },
        {
          title: "What is Resistance",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Resistance is a price level where <strong>selling pressure consistently prevents further price rise</strong>. It acts like a ceiling above the market.</p>
<h3>Why Resistance Exists</h3>
<p>Traders who bought too high (and are sitting at a loss) wait for price to return to their entry level so they can exit without loss. This creates selling pressure at that level.</p>
<h3>How to Identify Resistance Levels</h3>
<ul><li>Areas where price has reversed downward at least twice</li><li>Previous highs become resistance levels</li><li>Round numbers and key psychological levels act as resistance</li><li>Previous support levels often become resistance after being broken (role reversal)</li></ul>
<h3>Role Reversal</h3>
<blockquote><p>EUR/USD holds support at 1.1200 for weeks. Then price breaks below 1.1200. The next time price rallies back to 1.1200, that level now acts as resistance. This role reversal is one of the most powerful concepts in technical analysis.</p></blockquote>`,
        },
        {
          title: "How to Trade Support and Resistance",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Support and resistance trading is one of the most effective and timeless strategies in forex.</p>
<h3>The Bounce Strategy</h3>
<ol><li>Identify a clear, tested support or resistance level on the daily chart</li><li>Wait for price to reach that level</li><li>Look for a confirming candlestick pattern (hammer, engulfing, doji)</li><li>Enter the trade in the direction of the expected bounce</li><li>Place stop loss just beyond the support/resistance level</li><li>Target the next major support/resistance level for take profit</li></ol>
<h3>The Breakout Strategy</h3>
<ol><li>Identify a key resistance level that has been tested multiple times</li><li>Wait for a strong candle to close <strong>above</strong> resistance (or below support)</li><li>Enter in the breakout direction</li><li>Place stop loss back inside the broken level</li></ol>
<h3>False Breakouts</h3>
<p>Always wait for a candle to <strong>close</strong> beyond the level before entering. Never trade wicks that spike through a level without closing beyond it.</p>`,
        },
        {
          title: "Support and Resistance in Practice",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<h3>Building Your S&amp;R Map</h3>
<ol><li>Start on the Weekly chart. Mark major highs and lows from the past 2 years.</li><li>Move to the Daily chart. Mark significant highs and lows from the past 6 months.</li><li>Move to H4. Note levels where price has bounced or reversed clearly.</li></ol>
<h3>Zones, Not Lines</h3>
<p>Support and resistance are <strong>zones</strong>, not precise lines. Draw your levels as small zones (5-15 pips wide) to account for natural variation rather than exact lines.</p>
<h3>Confluence — The More, The Better</h3>
<p>The most powerful setups occur when multiple factors align at the same price level:</p>
<ul><li>A key support/resistance level</li><li>A Fibonacci retracement level (38.2%, 50%, 61.8%)</li><li>A moving average</li><li>A round number</li></ul>
<p>When 2-3 of these factors align at the same price, the probability of a reaction is significantly higher. These are called <strong>confluence zones</strong>.</p>`,
        },
        {
          title: "Module 8 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "Support is best defined as", options: [{id:"a",text:"A price level where selling pressure stops price from rising"},{id:"b",text:"A price level where buying pressure prevents further decline"},{id:"c",text:"The highest price of the day"},{id:"d",text:"A broker's minimum deposit requirement"}], correctOption: "b", explanation: "Support is where buying pressure consistently prevents further price decline — a floor." },
            { question: "Resistance is best defined as", options: [{id:"a",text:"A price level where buying pressure increases"},{id:"b",text:"A price level where selling pressure prevents further price rise"},{id:"c",text:"The lowest point of the year"},{id:"d",text:"A margin call level"}], correctOption: "b", explanation: "Resistance is where selling pressure consistently prevents price from rising — a ceiling." },
            { question: "What is role reversal in trading?", options: [{id:"a",text:"Switching from buying to selling"},{id:"b",text:"When a broken support level becomes resistance (or vice versa)"},{id:"c",text:"Changing your trading strategy"},{id:"d",text:"Using opposite indicators"}], correctOption: "b", explanation: "Role reversal is when a broken support level becomes resistance, or resistance becomes support." },
            { question: "The bounce strategy involves", options: [{id:"a",text:"Buying after a breakout above resistance"},{id:"b",text:"Trading the expected reaction when price reaches a support or resistance level"},{id:"c",text:"Shorting all uptrends"},{id:"d",text:"Avoiding support and resistance entirely"}], correctOption: "b", explanation: "The bounce strategy enters trades expecting price to react and bounce from a key S&R level." },
            { question: "A false breakout occurs when", options: [{id:"a",text:"Price breaks through a level convincingly"},{id:"b",text:"Price briefly exceeds a level but then reverses back"},{id:"c",text:"The market closes exactly at support"},{id:"d",text:"Volume is very high"}], correctOption: "b", explanation: "A false breakout is when price spikes through a level but closes back inside — no genuine breakout." },
            { question: "You should draw support and resistance as", options: [{id:"a",text:"Exact single price lines with 0 pip width"},{id:"b",text:"Zones of 5-15 pips to account for natural variation"},{id:"c",text:"Levels updated every minute"},{id:"d",text:"Only on the 1-minute chart"}], correctOption: "b", explanation: "S&R are zones, not exact lines. Drawing them as zones accounts for natural price variation." },
            { question: "Confluence in trading means", options: [{id:"a",text:"Trading with high leverage"},{id:"b",text:"Multiple technical factors aligning at the same price level"},{id:"c",text:"Copying another trader"},{id:"d",text:"Using a single indicator"}], correctOption: "b", explanation: "Confluence is when multiple factors (S&R, Fibonacci, MA, round number) align at the same level." },
            { question: "When identifying S&R, you should start on", options: [{id:"a",text:"The 1-minute chart"},{id:"b",text:"The weekly or daily chart, then zoom in"},{id:"c",text:"The chart with the most lines"},{id:"d",text:"A randomly chosen timeframe"}], correctOption: "b", explanation: "Always start on higher timeframes (weekly/daily) to identify the most significant levels, then zoom in." },
          ],
        },
      ],
    },
    // ─── MODULE 9 ────────────────────────────────────────────────────────────
    {
      title: "Market Psychology",
      planAccess: "PROFESSIONAL" as SubscriptionTier,
      lessons: [
        {
          title: "The Role of Psychology in Trading",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Trading is 80% psychology and 20% technical skill. You can have the best strategy in the world and still lose money if your mindset is wrong.</p>
<h3>The Two Primary Emotions</h3>
<ul><li><strong>Fear</strong> — Fear of losing money, fear of being wrong, fear of missing out. Leads to premature exits, missed opportunities, and paralysis.</li><li><strong>Greed</strong> — The desire for more profit than your plan allows. Leads to holding trades too long, removing take profits, over-leveraging, and taking unnecessary risks.</li></ul>
<h3>Why 80% of Traders Lose</h3>
<ul><li>Overtrading out of boredom or excitement</li><li>Revenge trading after losses</li><li>Moving stop losses further away to avoid being stopped out</li><li>Exiting winners too early out of fear</li><li>Holding losers too long hoping for recovery</li></ul>
<h3>Process-Based Thinking</h3>
<p>Profitable trading requires treating each trade as one of a thousand. No single trade matters. What matters is consistently following your rules over hundreds of trades. Focus on executing your process perfectly, not on the outcome of any individual trade.</p>`,
        },
        {
          title: "Greed — The Silent Account Killer",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Greed disguises itself as ambition and confidence, but beneath the surface it leads to systematic over-trading, over-leveraging, and account destruction.</p>
<h3>How Greed Manifests</h3>
<ul><li><strong>Removing take profit orders</strong> — "The price is still going. I'll let it run." Price then reverses and the winning trade becomes a loss.</li><li><strong>Adding to losing positions</strong> — "It has to bounce from here." Each addition increases risk exponentially.</li><li><strong>Using excessive leverage</strong> — "I can make 10x more with higher leverage." A single adverse move wipes the account.</li><li><strong>Overtrading</strong> — Taking low-quality trades simply because you want to be in the market.</li></ul>
<blockquote><p>A trader makes 5 good trades and grows the account by 15%. Feeling invincible, they double position size. The next trade moves against them. The loss wipes out all previous gains. Feeling frustrated, they double size again. Another loss. The account is now 40% down. This cycle repeats until the account is empty.</p></blockquote>
<h3>Controlling Greed</h3>
<ul><li>Pre-set your take profit before entering every trade and never change it</li><li>Fix your position size at a set percentage of account and never deviate</li><li>Set a daily profit target — when reached, stop trading for the day</li></ul>`,
        },
        {
          title: "Fear, Overconfidence, and FOMO",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<h3>Fear in Trading</h3>
<ul><li><strong>Exiting winners too early</strong> — A trade is up 20 pips. Fear triggers an early exit instead of the planned 60. Over 100 trades, this massively reduces profitability.</li><li><strong>Missing valid setups</strong> — After a loss, fear prevents taking the next valid setup. That setup would have been a winner.</li></ul>
<h3>Overconfidence</h3>
<p>A winning streak creates false confidence. Traders begin to believe they have unlocked the secret to the market. They increase position sizes, take lower quality setups, and abandon their rules. The market inevitably corrects their overconfidence.</p>
<blockquote><p>After winning 8 consecutive trades, a trader triples their position size. The 9th trade loses. Because of the larger size, this single loss equals the profit of the previous 8 wins combined.</p></blockquote>
<h3>FOMO — Fear of Missing Out</h3>
<p>FOMO occurs when you see a strong move happening and jump in without analysis — just to be part of the move. By the time you enter, the move is usually exhausted and the price reverses, catching you at the worst possible entry. Never chase price that has already moved significantly.</p>`,
        },
        {
          title: "Revenge Trading",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Revenge trading is one of the fastest ways to destroy a trading account. It occurs when a trader, after suffering a loss, immediately places another trade (usually larger) to recover the lost money, driven by emotion rather than logic.</p>
<h3>The Revenge Trading Cycle</h3>
<ol><li>Trader loses $200 on a trade</li><li>Frustrated, they immediately open another trade with double the position size</li><li>This trade also loses — now down $600</li><li>Even more frustrated, they open a third, even larger trade</li><li>Loss compounds. Account is severely damaged in a single session.</li></ol>
<h3>How to Break the Cycle</h3>
<ul><li><strong>Walk away after losses</strong> — Set a rule: maximum 3 losing trades per day, then stop trading. No exceptions.</li><li><strong>No immediate re-entry</strong> — After a stop loss, take a 30-minute break before considering the next trade</li><li><strong>Reduce position size after losses</strong> — Not increase it. Trade smaller when losing to protect capital.</li><li><strong>Journal every loss</strong> — Write down what happened, your emotional state, and what you will do differently.</li></ul>
<p>Professional traders accept losses as a normal part of trading — like a business expense. The goal is not to never lose, but to ensure your wins are larger than your losses over time.</p>`,
        },
        {
          title: "Module 9 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What percentage of retail traders consistently lose money?", options: [{id:"a",text:"10-20%"},{id:"b",text:"30-40%"},{id:"c",text:"75-80%"},{id:"d",text:"100%"}], correctOption: "c", explanation: "Studies consistently show that 75-80% of retail traders lose money, primarily due to psychology." },
            { question: "The two primary emotions that cause trading losses are", options: [{id:"a",text:"Happiness and sadness"},{id:"b",text:"Fear and greed"},{id:"c",text:"Patience and discipline"},{id:"d",text:"Logic and analysis"}], correctOption: "b", explanation: "Fear and greed are the two primary emotions that drive trading losses." },
            { question: "Revenge trading refers to", options: [{id:"a",text:"Copying a successful trader"},{id:"b",text:"Placing a larger emotional trade immediately after a loss to recover money"},{id:"c",text:"Using a revenge strategy on the market"},{id:"d",text:"Trading in a falling market"}], correctOption: "b", explanation: "Revenge trading is placing emotional, oversized trades immediately after a loss to recover money." },
            { question: "Overconfidence in trading typically follows", options: [{id:"a",text:"A series of losses"},{id:"b",text:"A long break from trading"},{id:"c",text:"A winning streak"},{id:"d",text:"Reading a trading book"}], correctOption: "c", explanation: "A winning streak creates false confidence, leading traders to abandon their rules." },
            { question: "FOMO in trading means", options: [{id:"a",text:"Finding Other Market Opportunities"},{id:"b",text:"Entering trades out of fear of missing a move"},{id:"c",text:"Following Other Managed Orders"},{id:"d",text:"A type of order execution"}], correctOption: "b", explanation: "FOMO is Fear of Missing Out — entering trades without proper analysis just to participate in a move." },
            { question: "How should you respond after three consecutive losing trades in a day?", options: [{id:"a",text:"Double your position size to recover"},{id:"b",text:"Stop trading for the day"},{id:"c",text:"Switch to a completely different strategy"},{id:"d",text:"Ignore your stop loss on the next trade"}], correctOption: "b", explanation: "After hitting your daily loss limit (e.g. 3 losing trades), stop trading and protect remaining capital." },
            { question: "Process-based thinking in trading means", options: [{id:"a",text:"Using automated software"},{id:"b",text:"Focusing on following your rules perfectly, not on individual trade outcomes"},{id:"c",text:"Optimising for maximum profit on each trade"},{id:"d",text:"Predicting the market exactly"}], correctOption: "b", explanation: "Process-based thinking focuses on consistent rule execution, not the outcome of any single trade." },
            { question: "Greed most commonly causes traders to", options: [{id:"a",text:"Exit too early with small profits"},{id:"b",text:"Remove take profit orders and hold trades too long"},{id:"c",text:"Use very small position sizes"},{id:"d",text:"Take fewer trades than they should"}], correctOption: "b", explanation: "Greed causes traders to remove take profit orders hoping for more, only to see the trade reverse." },
          ],
        },
      ],
    },
    // ─── MODULE 10 ───────────────────────────────────────────────────────────
    {
      title: "Risk Management",
      planAccess: "PROFESSIONAL" as SubscriptionTier,
      lessons: [
        {
          title: "The Golden Rule of Risk Management",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Risk management is the practice of controlling how much money you put at risk on each trade. It is the single most important skill that separates long-term profitable traders from those who blow their accounts.</p>
<h3>The 1-2% Rule</h3>
<p>Never risk more than <strong>1-2% of your total account balance</strong> on any single trade. This is the universal rule followed by professional traders worldwide.</p>
<blockquote><p>Account balance = $1,000. Risk per trade at 2% = $20. Even if you lose 10 trades in a row, your account is only down 20% — you still have $800 to trade. With disciplined risk management, you can recover from losing streaks. Without it, a few bad trades end your trading career.</p></blockquote>
<h3>The Mathematics of Survival</h3>
<p>Many beginners think the key is to be right on most trades. In reality, with proper risk management and a 1:2 risk-to-reward ratio, you only need to win 34% of your trades to be profitable. The maths of risk management is more important than the maths of prediction.</p>`,
        },
        {
          title: "Risk Per Trade Calculation",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Calculating your risk before every trade is mandatory. This calculation determines your exact position size and stop loss placement.</p>
<h3>The Risk Calculation Formula</h3>
<p>Risk Amount = Account Balance × Risk Percentage</p>
<blockquote><p>Account = $2,000. Risk = 1.5%. Risk Amount = $2,000 × 0.015 = $30. On this trade, your maximum loss must be $30.</p></blockquote>
<h3>From Risk Amount to Position Size</h3>
<p>Position Size = Risk Amount ÷ (Stop Loss Pips × Pip Value)</p>
<blockquote><p>Risk Amount = $30. Stop Loss = 30 pips. Pip value for micro lot = $0.10. Position Size = $30 ÷ (30 × $0.10) = $30 ÷ $3 = 10 micro lots.</p></blockquote>
<h3>Daily Loss Limit</h3>
<p>Set a <strong>daily loss limit</strong> of 3-5% of account as your maximum daily loss. Once this limit is hit, trading stops for the day regardless of how tempting the next setup looks.</p>`,
        },
        {
          title: "Risk to Reward Ratio",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>The Risk to Reward (R:R) ratio compares how much you risk against how much you aim to gain on each trade.</p>
<h3>Understanding R:R Ratios</h3>
<blockquote><p>Stop Loss = 30 pips (risk). Take Profit = 90 pips (reward). Risk to Reward = 1:3. For every $1 risked, you aim to make $3.</p></blockquote>
<h3>The Mathematics of R:R</h3>
<ul><li>With 1:1 R:R — You need to win 51%+ of trades to be profitable</li><li>With 1:2 R:R — You only need to win 34%+ of trades to be profitable</li><li>With 1:3 R:R — You only need to win 26%+ of trades to be profitable</li></ul>
<h3>Never Take Trades With Less Than 1:2 R:R</h3>
<p>If your potential reward is less than 2x your risk, do not take the trade. Wait. The market will present better opportunities.</p>
<blockquote><p>10 trades per month with 1:2 R:R. Win 5, lose 5 (50% win rate). Wins: 5 × 2 = 10 units. Losses: 5 × 1 = 5 units. Net profit = 5 units. Profitable despite only winning half your trades.</p></blockquote>`,
        },
        {
          title: "Capital Preservation",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Your trading capital is your most valuable asset. Capital preservation — protecting what you have — takes priority over making profits.</p>
<h3>The Mathematics of Loss Recovery</h3>
<ul><li>Lose 10%: Need 11% gain to recover</li><li>Lose 25%: Need 33% gain to recover</li><li>Lose 50%: Need 100% gain to recover</li><li>Lose 75%: Need 300% gain to recover</li></ul>
<p>Losses are mathematically harder to recover from than they appear. Protecting capital is essential for longevity.</p>
<h3>Capital Preservation Rules</h3>
<ul><li>Never add to a losing position hoping it will reverse</li><li>Never remove a stop loss once set</li><li>Stop trading when you hit your daily loss limit</li><li>Reduce position size during losing streaks — not increase</li><li>Withdraw profits regularly to protect gains</li></ul>
<h3>The Mindset Shift</h3>
<p>Beginners think: "How much can I make?" Professionals think: "How much can I afford to lose?" This mindset shift transforms a losing trader into a consistently profitable one.</p>`,
        },
        {
          title: "Module 10 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "The golden rule of risk management is to risk no more than", options: [{id:"a",text:"10% per trade"},{id:"b",text:"5% per trade"},{id:"c",text:"1-2% per trade"},{id:"d",text:"50% per trade"}], correctOption: "c", explanation: "Professional traders risk no more than 1-2% of their account balance on any single trade." },
            { question: "With a $5,000 account and 2% risk, your maximum risk per trade is", options: [{id:"a",text:"$500"},{id:"b",text:"$100"},{id:"c",text:"$50"},{id:"d",text:"$1,000"}], correctOption: "b", explanation: "$5,000 × 0.02 = $100 maximum risk per trade." },
            { question: "If you lose 10 consecutive trades at 2% risk each, your account is down approximately", options: [{id:"a",text:"20%"},{id:"b",text:"50%"},{id:"c",text:"80%"},{id:"d",text:"100%"}], correctOption: "a", explanation: "10 consecutive 2% losses results in approximately 18-20% drawdown — recoverable." },
            { question: "The minimum Risk-to-Reward ratio professionals recommend is", options: [{id:"a",text:"1:0.5"},{id:"b",text:"1:1"},{id:"c",text:"1:2"},{id:"d",text:"1:10"}], correctOption: "c", explanation: "Minimum 1:2 R:R means you only need to win 34% of trades to be profitable." },
            { question: "With a 1:2 R:R ratio, you only need to win what percentage of trades to be profitable?", options: [{id:"a",text:"51%"},{id:"b",text:"45%"},{id:"c",text:"34%"},{id:"d",text:"60%"}], correctOption: "c", explanation: "With 1:2 R:R, you can be profitable winning just 34% of trades." },
            { question: "If you lose 50% of your account, you need what percentage gain to fully recover?", options: [{id:"a",text:"50%"},{id:"b",text:"75%"},{id:"c",text:"100%"},{id:"d",text:"150%"}], correctOption: "c", explanation: "Losing 50% requires a 100% gain to recover — e.g. $500 back to $1,000." },
            { question: "A daily loss limit means", options: [{id:"a",text:"You can only make losses, not profits, in one day"},{id:"b",text:"Stop trading for the day when losses reach a predetermined maximum"},{id:"c",text:"You set a limit order for losses"},{id:"d",text:"Loss is limited by your broker automatically"}], correctOption: "b", explanation: "A daily loss limit is a self-imposed rule to stop trading once a set percentage is lost that day." },
            { question: "Professional traders primarily think about", options: [{id:"a",text:"How much they can make"},{id:"b",text:"How much they can afford to lose"},{id:"c",text:"Which indicator to use"},{id:"d",text:"What news is coming"}], correctOption: "b", explanation: "Professionals focus on capital protection first. The profits follow from disciplined risk management." },
          ],
        },
      ],
    },
    // ─── MODULE 11 ───────────────────────────────────────────────────────────
    {
      title: "Position Sizing",
      planAccess: "PROFESSIONAL" as SubscriptionTier,
      lessons: [
        {
          title: "What is Position Sizing",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Position sizing is the process of determining exactly how many lots to trade based on your account size, risk tolerance, and stop loss distance. It is the practical application of risk management.</p>
<h3>Why Position Sizing is Critical</h3>
<blockquote><p>Trader A uses fixed 1 standard lot regardless of account size or stop loss. On a 50-pip stop loss, they risk $500 per trade. On a 20-pip stop loss, they risk $200. Risk is inconsistent and often too large.</p>
<p>Trader B calculates position size so that every trade risks exactly $100. Whether the stop loss is 20 pips or 80 pips, the dollar risk is always $100. This is professional position sizing.</p></blockquote>
<h3>The Core Principle</h3>
<p>Position size must be calculated so that if the stop loss is hit, the dollar loss equals your predetermined risk amount. The stop loss distance determines the position size — not the other way around.</p>
<p>Never decide the position size first and then place the stop wherever looks convenient.</p>`,
        },
        {
          title: "Calculating Position Size",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Every trade requires a position size calculation. With practice, this takes less than 30 seconds.</p>
<h3>The Formula</h3>
<p><strong>Position Size (lots) = Risk Amount ÷ (Stop Loss Pips × Pip Value per Lot)</strong></p>
<h3>Step-by-Step Example</h3>
<ol><li>Account balance = $3,000</li><li>Risk percentage = 1.5%</li><li>Risk amount = $3,000 × 0.015 = $45</li><li>Entry: Buy EUR/USD at 1.10500. Stop loss at 1.10200 = 30 pip stop.</li><li>Pip value for micro lot EUR/USD ≈ $0.10</li><li>Position size = $45 ÷ (30 × $0.10) = $45 ÷ $3 = 15 micro lots (0.15 standard lots)</li></ol>
<blockquote><p>Open 0.15 lots EUR/USD with 30-pip stop. If stopped out, you lose exactly $45 = 1.5% of $3,000.</p></blockquote>
<p>Most brokers offer built-in position size calculators. Use them for every trade until the calculation becomes second nature.</p>`,
        },
        {
          title: "Lot Sizes in Practice",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<h3>Lot Sizes and Pip Values (USD Account)</h3>
<ul><li><strong>1 Standard Lot (1.00)</strong> — 100,000 units — $10 per pip</li><li><strong>1 Mini Lot (0.10)</strong> — 10,000 units — $1 per pip</li><li><strong>1 Micro Lot (0.01)</strong> — 1,000 units — $0.10 per pip</li></ul>
<h3>Account Size Recommendations</h3>
<ul><li><strong>Account $100-$500:</strong> Trade micro lots only (0.01-0.05). Risk $1-$5 per trade.</li><li><strong>Account $500-$2,000:</strong> Trade micro to mini lots (0.01-0.10). Risk $5-$40 per trade.</li><li><strong>Account $2,000-$10,000:</strong> Trade mini lots (0.05-0.50). Risk $50-$200 per trade.</li><li><strong>Account $10,000+:</strong> Mini to standard lots appropriate. Risk $100-$500+ per trade.</li></ul>
<h3>Key Practice Rule</h3>
<p>Your lot size should feel insignificant compared to your account. If each trade makes you anxious about the potential loss, your position size is too large. Reduce it until losing a trade feels like a normal business expense.</p>`,
        },
        {
          title: "Position Sizing for Account Growth",
          type: "TEXT" as LessonType,
          duration: 15,
          isFree: false,
          content: `<p>Correct position sizing not only protects your account — it enables consistent, steady growth through compounding.</p>
<h3>The Compounding Effect</h3>
<blockquote><p>Account = $5,000. Risk 1% per trade = $50. Win 3 trades at 1:2 R:R = $100 gain each. Lose 2 trades = $50 loss each. Net: +$200. Account grows to $5,200. Next month, 1% of $5,200 = $52. Profits compound naturally.</p></blockquote>
<h3>Fixed Risk vs Fixed Lot</h3>
<ul><li><strong>Fixed Lot (amateur approach)</strong> — Always trading the same lot size. Does not compound. Does not reduce risk during drawdowns.</li><li><strong>Fixed Risk % (professional approach)</strong> — Always risking the same percentage. Position size grows as account grows. Size shrinks when account shrinks — protecting capital during difficult periods.</li></ul>
<h3>The Patient Trader Wins</h3>
<p>A trader who grows their account by 5% per month using disciplined 1% risk per trade will have a larger account after 2 years than a trader who makes 50% one month and loses 40% the next. Consistency beats volatility in long-term trading success.</p>`,
        },
        {
          title: "Module 11 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "Position sizing determines", options: [{id:"a",text:"Which currency to trade"},{id:"b",text:"How many lots to trade based on risk and stop loss distance"},{id:"c",text:"When to open a trading account"},{id:"d",text:"Which broker to choose"}], correctOption: "b", explanation: "Position sizing calculates the exact number of lots so that your dollar risk equals your preset risk amount." },
            { question: "With a $4,000 account at 2% risk and a 40-pip stop (pip value $0.10 per micro lot), your position size is", options: [{id:"a",text:"0.20 lots"},{id:"b",text:"2.00 lots"},{id:"c",text:"20 micro lots (0.20)"},{id:"d",text:"200 micro lots"}], correctOption: "c", explanation: "Risk = $4,000 × 0.02 = $80. Position = $80 ÷ (40 × $0.10) = $80 ÷ $4 = 20 micro lots." },
            { question: "When should you determine your stop loss level?", options: [{id:"a",text:"After deciding position size"},{id:"b",text:"Before determining position size — stop goes at the correct technical level"},{id:"c",text:"It doesn't matter, they're independent"},{id:"d",text:"At the end of the trading session"}], correctOption: "b", explanation: "Always place stop loss at the correct technical level first, then calculate position size around it." },
            { question: "For a $300 account, which lot size is most appropriate?", options: [{id:"a",text:"1.00 standard lot"},{id:"b",text:"0.10 mini lot"},{id:"c",text:"0.01-0.03 micro lots"},{id:"d",text:"Any lot size is fine"}], correctOption: "c", explanation: "A $300 account should trade 0.01-0.03 micro lots to keep risk at 1-2% per trade." },
            { question: "Fixed Risk % position sizing means", options: [{id:"a",text:"Always trading the same fixed lot size"},{id:"b",text:"Risking the same percentage of account — so position size adjusts as account changes"},{id:"c",text:"Never changing your trading rules"},{id:"d",text:"Using a fixed spread broker"}], correctOption: "b", explanation: "Fixed Risk % means your position size scales up as account grows and down during drawdowns." },
            { question: "If your position size creates significant anxiety about potential loss, you should", options: [{id:"a",text:"Keep the same size and push through the fear"},{id:"b",text:"Increase the size to desensitise yourself"},{id:"c",text:"Reduce position size until the risk feels manageable"},{id:"d",text:"Stop trading permanently"}], correctOption: "c", explanation: "If a trade creates anxiety, the position size is too large relative to your emotional tolerance." },
            { question: "Compounding in trading means", options: [{id:"a",text:"Trading multiple pairs at once"},{id:"b",text:"Profits earn profits as account grows and risk percentage stays constant"},{id:"c",text:"Using compound interest from a bank"},{id:"d",text:"Adding to losing positions"}], correctOption: "b", explanation: "Compounding means your risk amount grows naturally as your account grows, accelerating gains." },
            { question: "A patient trader growing 5% per month is better than one making 50% then losing 40% because", options: [{id:"a",text:"5% is always more than 50%"},{id:"b",text:"Consistent compounding beats volatile swings over the long term"},{id:"c",text:"Monthly gains are taxed less"},{id:"d",text:"It requires less effort"}], correctOption: "b", explanation: "Consistent compounding growth far outperforms volatile boom-bust cycles over 2+ years." },
          ],
        },
      ],
    },
    // ─── MODULE 12 ───────────────────────────────────────────────────────────
    {
      title: "Creating Your First Trading Plan",
      planAccess: "PROFESSIONAL" as SubscriptionTier,
      lessons: [
        {
          title: "Why Every Trader Needs a Plan",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>A trading plan is a written document that defines every aspect of how you will trade. It is your personal rulebook — the framework that keeps you disciplined when emotions run high.</p>
<h3>Trading Without a Plan</h3>
<ul><li>Every trade is a separate emotional decision</li><li>There is no way to evaluate what is working and what is not</li><li>You are at the mercy of your emotions in every session</li><li>Inconsistency prevents any real skill development</li></ul>
<h3>Trading With a Plan</h3>
<ul><li>Clear rules remove in-the-moment decision fatigue</li><li>Performance can be tracked and improved methodically</li><li>Emotions are managed because decisions are made before the market opens</li><li>Losing streaks are normal within a defined system — not mysterious failures</li></ul>
<h3>The Plan is Your Business Document</h3>
<p>Professional traders treat trading as a business. A business has procedures, rules, and performance metrics. Your trading plan is your business operating procedure. Your capital is your business investment. Treat it accordingly.</p>`,
        },
        {
          title: "Defining Your Strategy and Edge",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>Your trading plan must include a clearly defined strategy — the specific conditions that must be present before you place any trade. This is called your <strong>edge</strong>.</p>
<h3>What is a Trading Edge?</h3>
<p>An edge is any approach that gives you a statistical advantage over random trading. It does not guarantee winning every trade — it means that over a large number of trades, your strategy produces positive expectancy.</p>
<h3>Elements of a Strategy</h3>
<ul><li><strong>Market</strong> — Which currency pairs will you trade? (e.g. EUR/USD and GBP/USD only)</li><li><strong>Timeframe</strong> — Which timeframe for analysis and entry? (e.g. Daily for trend, H4 for entry)</li><li><strong>Entry Conditions</strong> — What must you see before entering? (e.g. Price at key daily support + bullish engulfing candle)</li><li><strong>Stop Loss Rules</strong> — Where do you place stop loss? (e.g. 5 pips below support)</li><li><strong>Take Profit Rules</strong> — Where is your target? (e.g. Next key resistance, minimum 1:2 R:R)</li><li><strong>Entry Timing</strong> — When can you trade? (e.g. London session only, 8 AM-12 PM GMT)</li></ul>
<h3>Testing Your Edge</h3>
<p>Before trading live, back-test your strategy on historical charts. Calculate your win rate and average R:R over 100+ trades. If the system shows positive expectancy in backtesting, test it live with very small position sizes.</p>`,
        },
        {
          title: "Risk Rules and Daily Limits",
          type: "TEXT" as LessonType,
          duration: 20,
          isFree: false,
          content: `<p>The risk section of your trading plan is the most important part. Without clear, written risk rules, emotions will override sound judgement every time.</p>
<h3>Risk Rules to Include in Your Plan</h3>
<ul><li>Maximum risk per trade: 1% of account balance</li><li>Maximum daily loss limit: 3% of account (stop trading for the day)</li><li>Maximum weekly loss limit: 6% of account (reduce position sizes next week)</li><li>Maximum trades per day: 3 trades (prevents overtrading)</li><li>Minimum R:R ratio: 1:2 (never take a trade with less)</li><li>Stop loss rule: Every trade must have a stop loss set before entry</li><li>No revenge trading rule: After 2 consecutive losses, take a minimum 1-hour break</li></ul>
<h3>The Non-Negotiable Rules</h3>
<p>Your risk rules are non-negotiable. They exist precisely for the moments when you want to break them — when you are sure the market is going to do something, when you want to recover losses quickly, when a trade looks so obvious you want to bet big. The market will test these rules constantly. The trader who follows them consistently is the trader who survives.</p>`,
        },
        {
          title: "Building Your Complete Trading Plan",
          type: "TEXT" as LessonType,
          duration: 25,
          isFree: false,
          content: `<p>This final lesson brings everything together. Your trading plan is a living document — it evolves as your skills develop.</p>
<h3>Trading Plan Template</h3>
<ol><li><strong>My Trading Goal</strong> — Write a specific, measurable goal. Example: "Grow a $1,000 account to $1,500 within 12 months using disciplined 1% risk per trade and a minimum 1:2 R:R."</li><li><strong>Markets I Will Trade</strong> — List 1-3 pairs maximum. Example: EUR/USD and GBP/USD only.</li><li><strong>My Trading Hours</strong> — When you will sit at the charts. Example: Monday-Friday, 8 AM to 12 PM (London session open).</li><li><strong>My Strategy Rules</strong> — Your entry conditions written as an exact checklist. Every condition must be met before entering.</li><li><strong>Stop Loss Rules</strong> — Where and how you place stop losses. Never trade without a stop.</li><li><strong>Take Profit Rules</strong> — Minimum R:R, where you target, whether you use partial exits.</li><li><strong>Risk Rules</strong> — Maximum % per trade, daily loss limit, maximum trades per day.</li><li><strong>Trading Journal</strong> — Record every trade with entry, exit, reason, emotion, and result.</li><li><strong>Weekly Review Process</strong> — Every weekend, review the week's trades. Identify patterns, mistakes, and improvements.</li></ol>
<h3>The Final Philosophy</h3>
<p>Trading is a marathon, not a sprint. The traders who succeed are not necessarily the most intelligent or the best analysts. They are the ones who are most disciplined, most consistent, and most committed to following their process regardless of outcomes.</p>
<blockquote><p>Focus on risk. The profits will follow.</p></blockquote>
<p>Congratulations on completing the PipsPlus Beginner Trader Foundation Program. You now have the knowledge foundation that took most professional traders years to accumulate. The next step is practice — open a demo account and apply everything you have learned before risking any real money.</p>`,
        },
        {
          title: "Module 12 Quiz",
          type: "QUIZ" as LessonType,
          duration: 10,
          isFree: false,
          content: null,
          quizQuestions: [
            { question: "What is a trading plan?", options: [{id:"a",text:"A list of stocks to buy"},{id:"b",text:"A written document defining all rules for how you trade"},{id:"c",text:"A prediction of market direction"},{id:"d",text:"A broker's terms and conditions"}], correctOption: "b", explanation: "A trading plan is a comprehensive written document defining your strategy, risk rules, and trading process." },
            { question: "What is a trading edge?", options: [{id:"a",text:"A sharp price movement"},{id:"b",text:"A strategy with statistical advantage that produces positive expectancy over many trades"},{id:"c",text:"The spread paid on each trade"},{id:"d",text:"The edge of your price chart"}], correctOption: "b", explanation: "A trading edge is an approach that gives you a statistical advantage resulting in positive expectancy." },
            { question: "How many pairs should a beginner focus on?", options: [{id:"a",text:"All available pairs"},{id:"b",text:"At least 20 pairs for diversification"},{id:"c",text:"1-3 pairs maximum"},{id:"d",text:"One pair per day, rotating daily"}], correctOption: "c", explanation: "Beginners should focus on 1-3 pairs maximum to develop deep familiarity with their movements." },
            { question: "Back-testing a strategy means", options: [{id:"a",text:"Trading with your back turned to the screen"},{id:"b",text:"Applying your strategy rules to historical chart data to evaluate performance"},{id:"c",text:"Copying a strategy from a professional"},{id:"d",text:"Repeating the same trade until it works"}], correctOption: "b", explanation: "Back-testing applies your strategy rules to historical charts to calculate real win rate and expectancy." },
            { question: "Your daily loss limit should be", options: [{id:"a",text:"Set at 50% of account"},{id:"b",text:"There should be no limit to allow recovery"},{id:"c",text:"A fixed percentage (e.g. 3%) where trading stops for the day when reached"},{id:"d",text:"Decided after trading begins"}], correctOption: "c", explanation: "A daily loss limit (e.g. 3%) is a non-negotiable rule that stops trading once hit." },
            { question: "A trading journal is used to", options: [{id:"a",text:"Store your broker login details"},{id:"b",text:"Record every trade with entry, exit, reason, emotions, and result for review and improvement"},{id:"c",text:"Track other traders' performance"},{id:"d",text:"Calculate taxes automatically"}], correctOption: "b", explanation: "A trading journal records every trade for review, helping identify patterns and improve performance." },
            { question: "When should your risk rules be broken?", options: [{id:"a",text:"When you are very confident about a trade"},{id:"b",text:"When you are trying to recover from losses"},{id:"c",text:"Never — they are non-negotiable"},{id:"d",text:"On Fridays only"}], correctOption: "c", explanation: "Risk rules are non-negotiable. They exist precisely for the moments when you feel like breaking them." },
            { question: "The final philosophy of this program is", options: [{id:"a",text:"Focus on profits and the risk will manage itself"},{id:"b",text:"Focus on risk — the profits will follow"},{id:"c",text:"Trade as many times as possible daily"},{id:"d",text:"Use maximum leverage at all times"}], correctOption: "b", explanation: "Capital protection before profit seeking. Focus on risk management and consistent profits follow." },
          ],
        },
      ],
    },
  ] as ModuleData[],
};
