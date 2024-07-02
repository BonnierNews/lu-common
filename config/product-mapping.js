const sevenDayDelivery = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const sixDayDelivery = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const tuesdayThursdaySaturdayDelivery = [
  "tuesday",
  "thursday",
  "saturday",
];

const productConfig = {
  dn: [
    {
      title: "dn",
      tsCode: "0440",
      shortName: "DN",
      subDirectory: "",
      type: "paper",
      productName: "DN",
      diCustomerSystem: "DNY",
      diTitle: "Dagens Nyheter",
      complaintSenderId: "1160",
      deliveryDays: sevenDayDelivery,
    },
    {
      title: "kp",
      productName: "Kamratposten",
    },
  ],
  di: [
    {
      title: "di",
      tsCode: "0435",
      shortName: "DI",
      subDirectory: "",
      type: "paper",
      productName: "di",
      diCustomerSystem: "DI",
      diTitle: "Dagens Industri",
    },
  ],
  paf: [
    {
      title: "paf",
      tsCode: "paf",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "paf",
      diCustomerSystem: "",
      diTitle: "",
      deliveryDays: sevenDayDelivery,
    },
    {
      title: "plg",
      tsCode: "plg",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "plg",
      diCustomerSystem: "",
      diTitle: "",
      deliveryDays: sevenDayDelivery,
    },
  ],
  expressen: [
    {
      title: "expressen",
      tsCode: "0550",
      shortName: "EXP",
      subDirectory: "2185",
      type: "paper",
      modexProducts: [ { productName: "Expressen", productCode: "EX" } ],
      diCustomerSystem: "EXPA",
      diTitle: "EX Expressen",
      deliveryDays: sevenDayDelivery,
    },
    {
      title: "sportexpressen",
      productName: "SportExpressen",
    },
    {
      title: "gt",
      tsCode: "0760",
      shortName: "GT",
      subDirectory: "2650",
      type: "paper",
      modexProducts: [ { productName: "Göteborgstidningen", productCode: "GT" } ],
      diCustomerSystem: "GTI",
      diTitle: "EX Göteborgstidningen",
      deliveryDays: sevenDayDelivery,
    },
    {
      title: "kvp",
      tsCode: "1160",
      shortName: "KVP",
      subDirectory: "2651",
      type: "paper",
      modexProducts: [ { productName: "Kvällsposten", productCode: "KV" } ],
      diCustomerSystem: "KVP",
      diTitle: "EX Kvällsposten",
    },
    {
      title: null,
      tsCode: "6513",
      shortName: "EXL",
      subDirectory: "2652",
      type: "poster",
      modexProducts: [ { productName: "Expressen löp", productCode: "EX" } ],
      diTitle: "EX Expressen löp",
    },
    {
      title: null,
      tsCode: "6514",
      shortName: "GTL",
      subDirectory: "2653",
      type: "poster",
      modexProducts: [ { productName: "GT löp", productCode: "GT" } ],
      diTitle: "EX GT löp",
    },
    {
      title: null,
      tsCode: "6515",
      shortName: "KVPL",
      subDirectory: "2654",
      type: "poster",
      modexProducts: [ { productName: "KvP löp", productCode: "KV" } ],
      diTitle: "EX KvP löp",
    },
    {
      title: null,
      tsCode: "6516",
      shortName: "EXLP",
      subDirectory: "2655",
      type: "local-poster",
      modexProducts: [ { productName: "Expressen lokallöp", productCode: "EX" } ],
      diTitle: "EX Expressen lokallöp",
    },
    {
      title: null,
      tsCode: "6510",
      shortName: "GL",
      subDirectory: "2639",
      type: "local-poster",
      modexProducts: [ { productName: "GT lokallöp", productCode: "GT" } ],
      diTitle: "EX GT lokallöp",
    },
    {
      title: null,
      tsCode: "6511",
      shortName: "KL",
      subDirectory: "2640",
      type: "local-poster",
      modexProducts: [ { productName: "KvP lokallöp", productCode: "KV" } ],
      diTitle: "EX KvP lokallöp",
    },
    {
      title: null,
      tsCode: "6501",
      shortName: "TV",
      subDirectory: "2629",
      type: "paper",
      modexProducts: [ { productName: "TV", productCode: "TVD" } ],
      diTitle: "EX TV",
    },
    {
      title: null,
      tsCode: "6500",
      shortName: "KO",
      subDirectory: "2628",
      type: "paper",
      modexProducts: [ { productName: "Korsord", productCode: "KO" } ],
      diTitle: "EX Korsord",
    },
    {
      title: null,
      tsCode: "6502",
      shortName: "EX",
      subDirectory: "2630",
      type: "paper",
      modexProducts: [ { productName: "Extra", productCode: "EXTA" } ],
      diTitle: "EX Extra",
    },
    {
      title: null,
      tsCode: "6517",
      shortName: "ELB",
      subDirectory: "2656",
      type: "paper",
      modexProducts: [ { productName: "Leva & Bo", productCode: "LB" } ],
      diTitle: "EX Leva & Bo",
    },
    {
      title: null,
      tsCode: "9101",
      shortName: "TV14",
      subDirectory: "2632",
      type: "paper",
      modexProducts: [
        { productName: "TV14", productCode: "TVA" },
        { productName: "TV14", productCode: "TVC" },
      ],
      diTitle: "TV14",
    },
    {
      title: null,
      tsCode: "6504",
      shortName: "SON",
      subDirectory: "2633",
      type: "paper",
      modexProducts: [
        { productName: "Söndag", productCode: "SUN" },
        { productName: "Söndag", productCode: "SON" },
      ],
      diTitle: "EX Söndag",
    },
    {
      title: null,
      tsCode: "6506",
      shortName: "TM",
      subDirectory: "2635",
      type: "paper",
      modexProducts: [
        { productName: "Allt om mat", productCode: "AOMB" },
        { productName: "Allt om mat", productCode: "AOMA" },
        { productName: "Allt om mat jul", productCode: "ZAMJB" },
        { productName: "Allt om mat jul", productCode: "ZAMJA" },
        { productName: "Allt om mat sommar", productCode: "ZAMSB" },
        { productName: "Allt om trädgård", productCode: "ZAOTA" },
        { productName: "Allt om trädgård", productCode: "ZAOTB" },
        { productName: "Allt om trädgård special", productCode: "ZATSA" },
        { productName: "Allt om trädgård fixa sommar", productCode: "ZATSB" },
        { productName: "Allt om trädgård fixa höst", productCode: "ZATHA" },
        { productName: "Allt om trädgård Nybörjare", productCode: "AOTNA" },
        { productName: "Allt om trädgård Nybörjare", productCode: "ZAOMN" },
        { productName: "Allt om trädgård rabbatt & design", productCode: "ZTRDB" },
        { productName: "Hembakat", productCode: "HEMA" },
        { productName: "Hembakat", productCode: "HBB" },
        { productName: "Mitt Kök", productCode: "KOKA" },
        { productName: "Mitt Kök", productCode: "KOKB" },
      ],
      diTitle: "EX Trädgård & Mat",
    },
    {
      title: null,
      tsCode: "6508",
      shortName: "SP",
      subDirectory: "2637",
      type: "paper",
      modexProducts: [
        { productName: "Fotboll", productCode: "BOLL" },
        { productName: "Fotboll", productCode: "BOLA" },
        { productName: "Allsvenskan", productCode: "AS" },
        { productName: "Allsvenskan", productCode: "ASB" },
        { productName: "Premier League", productCode: "PLA" },
        { productName: "Premier League", productCode: "PLB" },
        { productName: "SHL", productCode: "SHLB" },
        { productName: "OS magasinet", productCode: "OSMB" },
        { productName: "Vinter OS", productCode: "VOSB" },
        { productName: "Fotboll EM damer", productCode: "FEMDB" },
        { productName: "Fotbolls VM", productCode: "FBVMB" },
        { productName: "Vintermagasin", productCode: "VMB" },
        { productName: "Sport", productCode: "SPO" },
        { productName: "Zlatan", productCode: "ZLA" },
        { productName: "Hockeyallsvenskan", productCode: "HAS" },
        { productName: "Vinterstudion", productCode: "VSB" },
        { productName: "OS Bilaga", productCode: "OSA" },
      ],
      diTitle: "Ex Sport",
    },
    {
      title: null,
      tsCode: "6503",
      shortName: "HI",
      subDirectory: "2631",
      type: "paper",
      modexProducts: [
        { productName: "Allt i Hemmet", productCode: "ZAIHA" },
        { productName: "Allt i hemmet julspecial", productCode: "ZAHJA" },
        { productName: "Allt i hemmet sommar", productCode: "ZAIHS" },
        { productName: "Gods & Gårdar", productCode: "ZGGA" },
        { productName: "Gård & Torp", productCode: "ZGTB" },
        { productName: "Gård&Torp Jul på torpet", productCode: "ZGTJT" },
        { productName: "Lantliv", productCode: "LL" },
        { productName: "Lantliv", productCode: "LLIVA" },
        { productName: "Lantliv sommarmat", productCode: "LLSMB" },
        { productName: "Lantliv sommarmat", productCode: "ZLLSA" },
        { productName: "Lantliv trädgård", productCode: "LLTA" },
        { productName: "Lantliv hela året", productCode: "ZLHÅB" },
        { productName: "Lantliv sommarhem", productCode: "ZLSA" },
        { productName: "Lantliv sommarhem", productCode: "LLSHB" },
        { productName: "Lantliv vintermat", productCode: "ZLVB" },
        { productName: "Lantliv trädgård", productCode: "ZLLB" },
        { productName: "Lantliv vårmat", productCode: "ZLVM" },
        { productName: "Sköna Hem Skapa Stilen", productCode: "ZSSA" },
        { productName: "Sköna Hem Skapa Stilen", productCode: "ZSSSB" },
        { productName: "Hem & Antik", productCode: "ZHAA" },
        { productName: "Hem & Antik", productCode: "ZHAB" },
        { productName: "Sommar på torpet", productCode: "ZSPTA" },
        { productName: "Lantliv höstmat", productCode: "ZLLHM" },
        { productName: "Lantliv höstmat", productCode: "LLHM" },
        { productName: "Sköna hem Inred krativt", productCode: "ZSHIK" },
        { productName: "Allt i hemmet julspecial", productCode: "AOHJB" },
        { productName: "Allt i Hemmet Årets vackraste", productCode: "ZAIHB" },
        { productName: "Lantliv vintermat", productCode: "ZLVA" },
      ],
      diTitle: "EX Hem & Inredning",
    },
    {
      title: null,
      tsCode: "6505",
      shortName: "ML",
      subDirectory: "2634",
      type: "paper",
      modexProducts: [
        { productName: "Allt om Resor", productCode: "AORA" },
        { productName: "Allt om Resor", productCode: "AORB" },
        { productName: "Allt om resor Sommarsverige", productCode: "AORSS" },
        { productName: "Amelia", productCode: "AB" },
        { productName: "Amelia Jul", productCode: "AJA" },
        { productName: "Amelia Jul", productCode: "ZAJB" },
        { productName: "Amelia julpyssel", productCode: "AJPB" },
        { productName: "Amelia sommar", productCode: "ASA" },
        { productName: "Amelia Höst", productCode: "ZAHB" },
        { productName: "Amelia höst", productCode: "AHA" },
        { productName: "Amelia Vår", productCode: "ZAVB" },
        { productName: "Amelia Kropp & Skönhet", productCode: "ZAKSB" },
        { productName: "Amelia sommar", productCode: "ZAS2" },
        { productName: "Damernas Värld", productCode: "DV" },
        { productName: "Damernas Värld", productCode: "DVB" },
        { productName: "M-magasin", productCode: "MMA" },
        { productName: "M Ekonomi", productCode: "ZMEB" },
        { productName: "M-Magasin special 55", productCode: "ZMM55" },
        { productName: "M Magasin ordning&reda", productCode: "ZMMFB" },
        { productName: "M Magasin Vår", productCode: "ZMMVB" },
        { productName: "M Magasin", productCode: "AMM" },
        { productName: "Styleby", productCode: "ZSBB" },
        { productName: "Tara", productCode: "TARAB" },
        { productName: "Tara kropp & själ", productCode: "ZTKSB" },
        { productName: "Teknikens Värld", productCode: "TEKB" },
        { productName: "Topphälsa", productCode: "ZTHA" },
        { productName: "Bästa resorna", productCode: "BRA" },
        { productName: "Mama", productCode: "ZMAA" },
        { productName: "Amelia", productCode: "AA" },
      ],
      diTitle: "EX Mode & Livsstil",
    },
    {
      title: null,
      tsCode: "6507",
      shortName: "MB",
      subDirectory: "2636",
      type: "paper",
      modexProducts: [
        { productName: "8-800", productCode: "M800B" },
        { productName: "Astro", productCode: "MASB" },
        { productName: "Fasta", productCode: "MFASB" },
        { productName: "Nystart", productCode: "MGNVB" },
        { productName: "Grytor", productCode: "MGRB" },
        { productName: "Historia", productCode: "MHAB" },
        { productName: "Krimhistoria", productCode: "MKH" },
        { productName: "Krimhistoria", productCode: "MKHB" },
        { productName: "Pallkrage", productCode: "MPKB" },
        { productName: "Crime", productCode: "CRB" },
        { productName: "Historia", productCode: "MHIA" },
        { productName: "Höstmat", productCode: "MHMB" },
        { productName: "Hälsa", productCode: "MBHB" },
        { productName: "Odla ätbart", productCode: "MOÄA" },
        { productName: "Astro", productCode: "ASTA" },
      ],
      diTitle: "EX Magbook",
    },
    {
      title: null,
      tsCode: "6509",
      shortName: "OS",
      subDirectory: "2638",
      type: "paper",
      modexProducts: [
        { productName: "EX GT Kvp Bilaga", productCode: "EB" },
        { productName: "Play", productCode: "NETFB" },
        { productName: "Äntligen Jul", productCode: "JUL" },
        { productName: "Äntligen Jul", productCode: "JULB" },
        { productName: "EX GT Kvp Special Produkt", productCode: "SP" },
        { productName: "Sommarsverige", productCode: "SSB" },
        { productName: "SommarSverige", productCode: "SSA" },
        { productName: "ABBA", productCode: "ABBAB" },
        { productName: "Höstkryss", productCode: "HÖKB" },
        { productName: "Månadskryss", productCode: "MK2" },
        { productName: "Månadskryss", productCode: "MKA" },
        { productName: "Sverigekryss", productCode: "SKB" },
        { productName: "Sommarkryss&pyssel", productCode: "SKPB" },
        { productName: "Julkryss", productCode: "JKA" },
        { productName: "Julkryss", productCode: "JKB" },
        { productName: "Julkryss", productCode: "MJKB" },
        { productName: "Vårkryss", productCode: "VKA" },
        { productName: "Kryssmagasin", productCode: "KMB" },
        { productName: "Kryssmagasin", productCode: "KMA" },
        { productName: "Krysstidning barn", productCode: "ZKT" },
        { productName: "Sudoku magasin", productCode: "SMA" },
        { productName: "Kamratposten", productCode: "KP1" },
        { productName: "Kamratposten", productCode: "KP2" },
        { productName: "Helgkryss", productCode: "HKA" },
        { productName: "Sudoku", productCode: "SUKU" },
      ],
      diTitle: "EX Oneshot",
    },
    {
      title: null,
      tsCode: "6512",
      shortName: "DP",
      subDirectory: "2641",
      type: "paper",
      modexProducts: [
        { productName: "Inplastad 8-800 & Topphälsa", productCode: "IP8TH" },
        { productName: "Inplastad SR&KO&L&B", productCode: "ISKLB" },
        { productName: "L&B Sommar Sverige Kryss", productCode: "IPBSK" },
        { productName: "Inplastad L&B ÄJ AOR", productCode: "IPLÄA" },
        { productName: "Inplastad AoT&AoM&KO", productCode: "IPTMK" },
        { productName: "Inplastad SS&L&B&KO", productCode: "IPSLK" },
        { productName: "Inplastad ÄJ&MK&JK", productCode: "IPJMK" },
        { productName: "Inplastad AIH Uteliv&AOT", productCode: "IPHUT" },
        { productName: "Inplastad AiH&SH", productCode: "IPAS" },
        { productName: "Inplastad AoM&AoR&KO", productCode: "IPMRB" },
        { productName: "Iplastad AV&VK", productCode: "IPAKB" },
        { productName: "Inplastad AoM&KO", productCode: "IPMKO" },
        { productName: "Inplastad AoM&LLT", productCode: "IPMLB" },
        { productName: "Inplastad AH&HB", productCode: "IPAHA" },
        { productName: "Inplastad SH&AoM", productCode: "IPSAB" },
        { productName: "Inplastad ÄG&KO&MK", productCode: "IPÄKM" },
        { productName: "Inplastad AJP&HB", productCode: "IPAH" },
        { productName: "Inplastad Amelia&Topphälsa", productCode: "IPATA" },
        { productName: "InplastadSH&DV14D", productCode: "IPSDA" },
        { productName: "Inplastad HB&AOM Grill", productCode: "IPHAG" },
        { productName: "Inplastad AOM&HB&SK", productCode: "IPAHS" },
        { productName: "Inplastad MK&L&B", productCode: "IPMKL" },
        { productName: "Inplastad SH&DV", productCode: "IPSD" },
        { productName: "Inplastad AoM&SH", productCode: "IPMH" },
        { productName: "Inplastad AiH&AJ", productCode: "IPHAB" },
        { productName: "DUO", productCode: "DUO2" },
      ],
      diTitle: "EX Duopack",
    },
  ],
  bnlo: [
    {
      title: "ab",
      alternativeTitles: [ "arbetarbladet" ],
      tsCode: "0140",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Arbetarbladet",
      diCustomerSystem: "",
    },
    {
      title: "at",
      alternativeTitles: [ "arbogatidning" ],
      tsCode: "0401",
      shortName: "AT",
      subDirectory: "",
      type: "paper",
      productName: "Arboga Tidning",
      diCustomerSystem: "ARBO",
    },
    {
      title: "av",
      alternativeTitles: [ "avestatidning" ],
      tsCode: "0290",
      shortName: "AV",
      subDirectory: "",
      type: "paper",
      productName: "Avesta Tidning",
      diCustomerSystem: "AV",
    },
    {
      title: "bb",
      alternativeTitles: [ "bergslagsbladet" ],
      tsCode: "0400",
      shortName: "BB",
      subDirectory: "",
      type: "paper",
      productName: "Bärgslagsbladet",
      diCustomerSystem: "BARG",
    },
    {
      title: "bblat",
      productName: "Bbl/AT",
    },
    {
      title: "bp",
      productName: "Bandypuls",
    },
    {
      title: "bt",
      alternativeTitles: [ "borlangetidning" ],
      tsCode: "0380",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Borlange Tidning",
      diCustomerSystem: "",
    },
    {
      title: "dd",
      alternativeTitles: [ "dalademokraten" ],
      tsCode: "0500",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Dala-Demokraten",
      diCustomerSystem: "",
    },
    {
      title: "fp",
      alternativeTitles: [ "fagerstaposten" ],
      tsCode: "0610",
      shortName: "FP",
      subDirectory: "",
      type: "paper",
      productName: "Fagersta-Posten",
      diCustomerSystem: "FPO",
    },
    {
      title: "ft",
      alternativeTitles: [ "falkopingstidning" ],
      tsCode: "0620",
      shortName: "FT",
      subDirectory: "",
      type: "paper",
      productName: "Falköpings Tidning",
      diCustomerSystem: "FTI",
    },
    {
      title: "fk",
      alternativeTitles: [ "falukuriren" ],
      tsCode: "0630",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Falu-Kuriren",
      diCustomerSystem: "",
    },
    {
      title: "frp",
      productName: "Folkracepuls",
    },
    {
      title: "gd",
      alternativeTitles: [ "gefledagblad" ],
      tsCode: "0720",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Gefle Dagblad",
      diCustomerSystem: "",
    },
    {
      title: "hd",
      alternativeTitles: [ "helsingborgsdagblad" ],
      tsCode: "0960",
      shortName: "HD",
      subDirectory: "",
      type: "paper",
      productName: "Helsingborgs Dagblad",
      diCustomerSystem: "HELD",
    },
    {
      title: "hp",
      productName: "Hockeypuls",
    },
    {
      title: "ht",
      alternativeTitles: [ "hudiksvalsstidning", "hudiksvallstidning" ],
      tsCode: "0990",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Hudiksvalls Tidning",
      diCustomerSystem: "",
    },
    {
      title: "jnytt",
      productName: "Jnytt",
    },
    {
      title: "jp",
      alternativeTitles: [ "jonkopingsposten" ],
      tsCode: "1040",
      shortName: "JP",
      subDirectory: "",
      type: "paper",
      productName: "Jönköpings-Posten",
      diCustomerSystem: "JP",
    },
    {
      title: "lp",
      alternativeTitles: [ "landskronaposten" ],
      tsCode: "1403",
      shortName: "LAP",
      subDirectory: "",
      type: "paper",
      productName: "Landskrona Posten",
      diCustomerSystem: "LAP",
    },
    {
      title: "ljp",
      alternativeTitles: [ "ljudalsposten" ],
      tsCode: "1220",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Ljusdals-Posten",
      diCustomerSystem: "",
    },
    {
      title: "lj",
      alternativeTitles: [ "ljusnan" ],
      tsCode: "1230",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Ljusnan",
      diCustomerSystem: "",
    },
    {
      title: "ltz",
      alternativeTitles: [ "ltostersund" ],
      tsCode: "1290",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Länstidningen, Östersund",
      diCustomerSystem: "",
    },
    {
      title: "lts",
      alternativeTitles: [ "ltsodertalje" ],
      tsCode: "1270",
      shortName: "LT",
      subDirectory: "",
      type: "paper",
      productName: "Länstidningen, Södertälje",
      diCustomerSystem: "LT",
    },
    {
      title: "mt",
      alternativeTitles: [ "moratidning" ],
      tsCode: "1330",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Mora Tidning",
      diCustomerSystem: "",
    },
    {
      title: "na",
      alternativeTitles: [ "nerikesallehanda" ],
      tsCode: "1380",
      shortName: "NAA",
      subDirectory: "",
      type: "paper",
      productName: "Nerikes Allehanda",
      diCustomerSystem: "NAA",
    },
    {
      title: "nio",
      productName: "Nu i Österåker",
    },
    {
      title: "nst",
      alternativeTitles: [ "norraskanetidning" ],
      tsCode: "1400",
      shortName: "NST",
      subDirectory: "",
      type: "paper",
      productName: "Nordvästra Skånes Tidningar",
      diCustomerSystem: "NST",
    },
    {
      title: "nt",
      alternativeTitles: [ "norrteljetidning" ],
      tsCode: "1530",
      shortName: "NOT",
      subDirectory: "",
      type: "paper",
      productName: "Norrtelje Tidning",
      diCustomerSystem: "NORR",
    },
    {
      title: "nlt",
      alternativeTitles: [ "nyaludvikatidning" ],
      tsCode: "1545",
      shortName: "LUD",
      subDirectory: "",
      type: "paper",
      productName: "Nya Ludvika Tidning",
      diCustomerSystem: "LUD",
    },
    {
      title: "np",
      alternativeTitles: [ "nynashamnsposten" ],
      tsCode: "1590",
      shortName: "NP",
      subDirectory: "",
      type: "paper",
      productName: "Nynäshamns Posten",
      diCustomerSystem: "NYP",
    },
    {
      title: "nvp",
      productName: "Nacka Värmdö Posten",
    },
    {
      title: "oa",
      alternativeTitles: [ "ornskoldsvikallehanda" ],
      tsCode: "2420",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Örnsköldsviks Allehanda",
      diCustomerSystem: "",
    },
    {
      title: "op",
      alternativeTitles: [ "ostersundsposten" ],
      tsCode: "2430",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Östersunds-Posten",
      diCustomerSystem: "",
    },
    {
      title: "sa",
      alternativeTitles: [ "salaallehanda" ],
      tsCode: "1640",
      shortName: "SA",
      subDirectory: "",
      type: "paper",
      productName: "Sala Allehanda",
      diCustomerSystem: "SALA",
    },
    {
      title: "sklt",
      alternativeTitles: [ "skaraborgslanstidning" ],
      tsCode: "1700",
      shortName: "SKL",
      subDirectory: "",
      type: "paper",
      productName: "Skaraborgs Läns Tidning",
      diCustomerSystem: "SKL",
    },
    {
      title: "smd",
      alternativeTitles: [ "smalandsdagblad" ],
      tsCode: "1781",
      shortName: "SMD",
      subDirectory: "",
      type: "paper",
      productName: "Smålands Dagblad",
      diCustomerSystem: "SMD",
    },
    {
      title: "smt",
      alternativeTitles: [ "smalandstidningen" ],
      tsCode: "1780",
      shortName: "SMT",
      subDirectory: "",
      type: "paper",
      productName: "Smålands-Tidningen",
      diCustomerSystem: "SMT",
    },
    {
      title: "sml",
      alternativeTitles: [ "smalanningen", "smalannigen" ],
      tsCode: "1210",
      shortName: "SM",
      subDirectory: "",
      type: "paper",
      productName: "Smålänningen",
      diCustomerSystem: "SMÅ",
    },
    {
      title: "sk",
      alternativeTitles: [ "soderhamnskuriren" ],
      tsCode: "1000",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Söderhamns Kuriren",
      diCustomerSystem: "",
    },
    {
      title: "sn",
      productName: "Skövde Nyheter",
    },
    {
      title: "sdt",
      alternativeTitles: [ "sodradalarnestidning" ],
      tsCode: "2030",
      shortName: "SDT",
      subDirectory: "",
      type: "paper",
      productName: "Södra Dalarnes Tidning",
      diCustomerSystem: "SDT",
    },
    {
      title: "st",
      alternativeTitles: [ "sundsvallstidning" ],
      tsCode: "1820",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Sundsvalls Tidning",
      diCustomerSystem: "",
    },
    {
      title: "sds",
      alternativeTitles: [ "sydsvenskan" ],
      tsCode: "1900",
      shortName: "SDS",
      subDirectory: "",
      type: "paper",
      productName: "Sydsvenskan",
      diCustomerSystem: "SDS",
    },
    {
      title: "ta",
      alternativeTitles: [ "tidningenangermanland" ],
      tsCode: "2078",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Tidningen Ångermanland",
      diCustomerSystem: "",
    },
    {
      title: "th",
      alternativeTitles: [ "tidningenharjedalen" ],
      tsCode: "1010",
      shortName: "",
      subDirectory: "",
      type: "paper",
      productName: "Tidningen Härjedalen",
      diCustomerSystem: "",
    },
    {
      title: "trt",
      alternativeTitles: [ "tranastidning" ],
      tsCode: "1783",
      shortName: "TT",
      subDirectory: "",
      type: "paper",
      productName: "Tranås Tidning",
      diCustomerSystem: "TTI",
    },
    {
      title: "trp",
      productName: "Tranås-Posten",
    },
    {
      title: "vlt",
      alternativeTitles: [ "vastmanlandslanstidning" ],
      tsCode: "2170",
      shortName: "VLT",
      subDirectory: "",
      type: "paper",
      productName: "VLT",
      diCustomerSystem: "VLT",
    },
    {
      title: "vn",
      alternativeTitles: [ "varnamonyheter" ],
      tsCode: "2230",
      shortName: "VN",
      subDirectory: "",
      type: "paper",
      productName: "Värnamo Nyheter",
      diCustomerSystem: "VNY",
    },
    {
      title: "vb",
      alternativeTitles: [ "vastgotanyheter" ],
      tsCode: "2320",
      shortName: "VB",
      subDirectory: "",
      type: "paper",
      productName: "Västgöta-Bladet",
      diCustomerSystem: "VB",
    },
    {
      title: "vp",
      alternativeTitles: [ "vetlandaposten" ],
      tsCode: "1782",
      shortName: "VP",
      subDirectory: "",
      type: "paper",
      productName: "Vetlanda-Posten",
      diCustomerSystem: "VP",
      deliveryDays: [
        "tuesday",
        "thursday",
        "saturday",
      ],
    },
    {
      title: "skd",
      alternativeTitles: [ "skanskadagbladet" ],
      tsCode: "1720",
      shortName: "SKD",
      subDirectory: "",
      type: "paper",
      productName: "Skånska Dagbladet",
      diCustomerSystem: "SKD",
    },
  ],
  gotamedia: [
    {
      title: "ba",
      alternativeTitles: [ "barometern" ],
      tsCode: "0300",
      shortName: "BA",
      subDirectory: "",
      type: "paper",
      productName: "Barometern",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "blt",
      tsCode: "0340",
      shortName: "BLT",
      subDirectory: "",
      type: "paper",
      productName: "Blekinge Läns Tidning",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "bti",
      tsCode: "0390",
      shortName: "BT",
      subDirectory: "",
      type: "paper",
      productName: "Borås Tidning",
      diCustomerSystem: "GOT",
      deliveryDays: sevenDayDelivery,
    },
    {
      title: "so",
      tsCode: "1940",
      shortName: "SSD",
      subDirectory: "",
      type: "paper",
      productName: "Sydöstran",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "smp",
      tsCode: "1770",
      shortName: "SMP",
      subDirectory: "",
      type: "paper",
      productName: "Smålandsposten",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "kb",
      tsCode: "2050",
      shortName: "KB",
      subDirectory: "",
      type: "paper",
      productName: "Kristianstadsbladet",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "ya",
      tsCode: "2370",
      shortName: "YA",
      subDirectory: "",
      type: "paper",
      productName: "Ystads Allehanda",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "tra",
      tsCode: "2090",
      shortName: "TA",
      subDirectory: "",
      type: "paper",
      productName: "Trelleborgs Allehanda",
      diCustomerSystem: "GOT",
      deliveryDays: tuesdayThursdaySaturdayDelivery,
    },
    {
      title: "ob",
      tsCode: "2390",
      shortName: "ÖB",
      subDirectory: "",
      type: "paper",
      productName: "Ölandsbladet",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "ut",
      tsCode: "2140",
      shortName: "UT",
      subDirectory: "",
      type: "paper",
      productName: "Ulricehamns Tidning",
      diCustomerSystem: "GOT",
      deliveryDays: tuesdayThursdaySaturdayDelivery,
    },
    {
      title: "klt",
      tsCode: "1060",
      shortName: "KLT",
      subDirectory: "",
      type: "paper",
      productName: "Kalmar Läns tidning",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "vk",
      tsCode: "2365",
      shortName: "VK",
      subDirectory: "",
      type: "paper",
      productName: "Växjöbladet Kronobergaren",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "nsk",
      tsCode: "1440",
      shortName: "NSK",
      subDirectory: "",
      type: "paper",
      productName: "Norra Skåne",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
    {
      title: "ot",
      tsCode: "0301",
      shortName: "OT",
      subDirectory: "",
      type: "paper",
      productName: "Oskarshamnstidningen",
      diCustomerSystem: "GOT",
      deliveryDays: sixDayDelivery,
    },
  ],
};

export default productConfig;
