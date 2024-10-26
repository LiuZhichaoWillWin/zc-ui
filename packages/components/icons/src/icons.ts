import { ExtractPublicPropTypes, PropType } from "vue";

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number|string>
} as const;
export type IconProps = ExtractPublicPropTypes<typeof iconProps>;