export function LoadingBars(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "40"}
      height={props.height ? props.height : "30"}
      fill={props.fill}
      viewBox="0 0 135 140"
    >
      <rect width="15" height="120" y="10" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="120;110;100;90;80;70;60;50;40;140;120"
        ></animate>
        <animate
          attributeName="y"
          begin="0.5s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="10;15;20;25;30;35;40;45;50;0;10"
        ></animate>
      </rect>
      <rect width="15" height="120" x="30" y="10" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="120;110;100;90;80;70;60;50;40;140;120"
        ></animate>
        <animate
          attributeName="y"
          begin="0.25s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="10;15;20;25;30;35;40;45;50;0;10"
        ></animate>
      </rect>
      <rect width="15" height="140" x="60" rx="6">
        <animate
          attributeName="height"
          begin="0s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="120;110;100;90;80;70;60;50;40;140;120"
        ></animate>
        <animate
          attributeName="y"
          begin="0s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="10;15;20;25;30;35;40;45;50;0;10"
        ></animate>
      </rect>
      <rect width="15" height="120" x="90" y="10" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="120;110;100;90;80;70;60;50;40;140;120"
        ></animate>
        <animate
          attributeName="y"
          begin="0.25s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="10;15;20;25;30;35;40;45;50;0;10"
        ></animate>
      </rect>
      <rect width="15" height="120" x="120" y="10" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="120;110;100;90;80;70;60;50;40;140;120"
        ></animate>
        <animate
          attributeName="y"
          begin="0.5s"
          calcMode="linear"
          dur="1s"
          repeatCount="indefinite"
          values="10;15;20;25;30;35;40;45;50;0;10"
        ></animate>
      </rect>
    </svg>
  );
}
