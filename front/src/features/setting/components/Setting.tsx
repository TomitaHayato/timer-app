import { Measure } from "./Measure";

export function Setting() {
  return(
    <>
      <div>
        <h3 className="text-center text-2xl font-semibold mb-8">設定</h3>

        {/* フォーム */}
        <div className="flex flex-col gap-8">
          <Measure
            itemsNum={11}
            min={10}
            max={60}
            defaultVal={25}
            step={5}
            measureId={'workSec-form'}
            item="作業時間"
            unit="分"/>

          <Measure
            itemsNum={10}
            min={1}
            max={10}
            defaultVal={5}
            step={1}
            measureId={'restSec-form'}
            item="休憩時間"
            unit="分"/>
          
          <Measure
            itemsNum={12}
            min={5}
            max={60}
            defaultVal={15}
            step={5}
            measureId={'longRest-form'}
            item="長期休憩"
            unit="分"/>

          <Measure
            itemsNum={11}
            min={0}
            max={100}
            defaultVal={50}
            step={10}
            measureId={'volume-form'}
            item="音量"
            unit=""/>
        </div>
      </div>
    </>
  )
}