export type Property = {
  id: number
  lat: number
  lng: number
  label: string
  address: string
  meta: string
  verdict: string
  verdictColor: string
  verdictText: string
  price: string
  growth: string
  median: string
  clearance: string
  dom: string
  type: 'buy' | 'invest'
  active: boolean
  image?: string
}

export const DEE_WHY_PROPERTIES: Property[] = [
  { id:1, lat:-33.7489, lng:151.2893, label:'$2.15M', address:'14 Fisher Rd, Dee Why', meta:'4 bed · 2 bath · 512m²', verdict:'✓ Good buy', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$2.15M', growth:'↑ +6.8% YoY', median:'$2.65M', clearance:'65%', dom:'32', type:'buy', active:true, image:'https://bucket-api.domain.com.au/v1/bucket/image/2020782813_1_1_260422_083912-w4131-h2756' },
  { id:2, lat:-33.7511, lng:151.2871, label:'$1.82M', address:'8 Oaks Ave, Dee Why', meta:'3 bed · 1 bath · 380m²', verdict:'✓ Under median', verdictColor:'#E3F2FD', verdictText:'#0D47A1', price:'$1.82M', growth:'↑ +5.2% YoY', median:'$2.19M', clearance:'65%', dom:'28', type:'buy', active:false, image:'https://bucket-api.domain.com.au/v1/bucket/image/cck241m6j1se8_1_0_260402_063833-w4134-h2755' },
  { id:3, lat:-33.7502, lng:151.2908, label:'$2.05M', address:'32 Howard Ave, Dee Why', meta:'3 bed · 2 bath · 420m²', verdict:'✓ Fairly priced', verdictColor:'#FFF8E1', verdictText:'#E65100', price:'$2.05M', growth:'↑ +5.2% YoY', median:'$2.19M', clearance:'65%', dom:'28', type:'buy', active:false, image:'https://bucket-api.domain.com.au/v1/bucket/image/2020749579_1_1_260410_123915-w1600-h1067' },
  { id:4, lat:-33.7475, lng:151.2875, label:'$2.38M', address:'5 Lismore Ave, Dee Why', meta:'4 bed · 2 bath · 560m²', verdict:'✓ Strong growth', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$2.38M', growth:'↑ +6.8% YoY', median:'$2.65M', clearance:'65%', dom:'32', type:'invest', active:false, image:'https://bucket-api.domain.com.au/v1/bucket/image/2020850818_1_1_260518_083112-w3658-h2743' },
  { id:5, lat:-33.7522, lng:151.2855, label:'$1.68M', address:'11 Pittwater Rd, Dee Why', meta:'2 bed · 1 bath · 310m²', verdict:'✓ Yield 5.2%', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$1.68M', growth:'↑ +4.3% YoY', median:'$1.195M', clearance:'65%', dom:'28', type:'invest', active:false, image:'https://bucket-api.domain.com.au/v1/bucket/image/2020843426_1_1_260514_072726-w3300-h2200' },
  { id:6, lat:-33.7465, lng:151.2910, label:'$2.62M', address:'22 The Crescent, Dee Why', meta:'5 bed · 3 bath · 680m²', verdict:'✓ Premium block', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$2.62M', growth:'↑ +8.1% YoY', median:'$3.10M', clearance:'65%', dom:'35', type:'buy', active:false, image:'https://bucket-api.domain.com.au/v1/bucket/image/2020764338_1_1_260415_062513-w1536-h1024' },
]
