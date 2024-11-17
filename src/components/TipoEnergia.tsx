// components/TipoEnergia.tsx
import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";

type TipoEnergiaProps = {
  tipoEnergia: string;
};

type TipoEnergiaInfoType = {
  [key: string]: {
    colorClass: string;
    description: string;
  };
};

const tipoEnergiaInfo: TipoEnergiaInfoType = {
  Solar: {
    colorClass: "text-green-500",
    description: "Pegada de carbono muito baixa.",
  },
  Eólica: {
    colorClass: "text-green-500",
    description: "Pegada de carbono muito baixa, sustentável a longo prazo.",
  },
  Hidrelétrica: {
    colorClass: "text-yellow-500",
    description:
      "Impactos ambientais em ecossistemas locais, mas emissões menores que fósseis.",
  },
  Fóssil: {
    colorClass: "text-red-500",
    description: "Altas emissões de gases de efeito estufa.",
  },
};

const TipoEnergia: FC<TipoEnergiaProps> = ({ tipoEnergia }) => {
  const info = tipoEnergiaInfo[tipoEnergia];

  if (!info) {
    // Caso o tipo de energia não esteja mapeado
    return <span>{tipoEnergia}</span>;
  }

  return (
    <span className="flex items-center gap-1">
      <span className={info.colorClass}>{tipoEnergia}</span>
      <AiOutlineQuestionCircle
        data-tooltip-id={`tooltip-${tipoEnergia}`}
        className="cursor-pointer"
      />
      <Tooltip id={`tooltip-${tipoEnergia}`} content={info.description} />
    </span>
  );
};

export default TipoEnergia;
