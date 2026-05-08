import { algorithmInputKpis } from '@/mocks/algorithms'
import { AlgoKpiTile } from '../AlgoKpiTile'

export function AlgorithmInputTab() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold leading-tight text-foreground">Summary</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-foreground">Algorithm Input</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {algorithmInputKpis.map((kpi) => (
            <AlgoKpiTile key={kpi.key} kpi={kpi} />
          ))}
        </div>
      </div>
    </div>
  )
}
