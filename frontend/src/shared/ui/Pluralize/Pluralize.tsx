import styles from "./Pluralize.module.css";
type PluralizeProps = {
  count: number;
  one: string;
  few: string;
  many: string;
};

export default function Pluralize({ count, one, few, many }: PluralizeProps) {
  type PluralForms = {
    one: string;
    few: string;
    many: string;
  };

  const pluralRules = new Intl.PluralRules("uk");

  function pluralize(n: number, forms: PluralForms) {
    const rule = pluralRules.select(n);

    switch (rule) {
      case "one":
        return forms.one;
      case "few":
        return forms.few;
      default:
        return forms.many;
    }
  }
  return (
    <div className={styles.pluralize}>
      {count} {pluralize(count, { one, few, many })}
    </div>
  );
}
