import { algorithmResultsKpis } from '@/mocks/algorithms'
import { AlgoKpiTile } from '../AlgoKpiTile'

export function AlgorithmResults() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold leading-tight text-foreground">Summary</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {algorithmResultsKpis.map((kpi) => (
          <AlgoKpiTile key={kpi.key} kpi={kpi} />
        ))}
      </div>
    </div>
  )
}
