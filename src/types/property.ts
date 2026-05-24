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
}

export const DEE_WHY_PROPERTIES: Property[] = [
  { id:1, lat:-33.7489, lng:151.2893, label:'$2.15M', address:'14 Fisher Rd, Dee Why', meta:'4 bed · 2 bath · 512m²', verdict:'✓ Good buy', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$2.15M', growth:'↑ +7.4% YoY', median:'$2.08M', clearance:'74%', dom:'22', type:'buy', active:true },
  { id:2, lat:-33.7511, lng:151.2871, label:'$1.82M', address:'8 Oaks Ave, Dee Why', meta:'3 bed · 1 bath · 380m²', verdict:'✓ Under median', verdictColor:'#E3F2FD', verdictText:'#0D47A1', price:'$1.82M', growth:'↑ +5.9% YoY', median:'$1.94M', clearance:'71%', dom:'28', type:'buy', active:false },
  { id:3, lat:-33.7502, lng:151.2908, label:'$2.05M', address:'32 Howard Ave, Dee Why', meta:'3 bed · 2 bath · 420m²', verdict:'✓ Fairly priced', verdictColor:'#FFF8E1', verdictText:'#E65100', price:'$2.05M', growth:'↑ +6.2% YoY', median:'$2.08M', clearance:'72%', dom:'26', type:'buy', active:false },
  { id:4, lat:-33.7475, lng:151.2875, label:'$2.38M', address:'5 Stoney Creek Rd, Dee Why', meta:'4 bed · 2 bath · 560m²', verdict:'✓ Strong growth', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$2.38M', growth:'↑ +9.8% YoY', median:'$2.21M', clearance:'79%', dom:'13', type:'invest', active:false },
  { id:5, lat:-33.7522, lng:151.2855, label:'$1.68M', address:'11 Pittwater Rd, Dee Why', meta:'2 bed · 1 bath · 310m²', verdict:'✓ Yield 5.2%', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$1.68M', growth:'↑ +4.7% YoY', median:'$1.72M', clearance:'69%', dom:'32', type:'invest', active:false },
  { id:6, lat:-33.7465, lng:151.2910, label:'$2.62M', address:'22 Long Reef Ave, Dee Why', meta:'5 bed · 3 bath · 680m²', verdict:'✓ Premium block', verdictColor:'#E8F5E9', verdictText:'#1B5E20', price:'$2.62M', growth:'↑ +11.1% YoY', median:'$2.48M', clearance:'82%', dom:'10', type:'buy', active:false },
]
