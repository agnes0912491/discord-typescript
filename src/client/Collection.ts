export interface CollectionConstructor {
  new (): Collection<unknown, unknown>;
  new <K, V>(entries?: readonly (readonly [K, V])[] | null): Collection<K, V>;
  new <K, V>(iterable: Iterable<readonly [K, V]>): Collection<K, V>;
  readonly prototype: Collection<unknown, unknown>;
  readonly [Symbol.species]: CollectionConstructor;
}

export type ReadonlyCollection<K, V> = Omit<
  Collection<K, V>,
  "delete" | "ensure" | "forEach" | "get" | "reverse" | "set" | "sort" | "sweep"
> &
  ReadonlyMap<K, V>;

export interface Collection<K, V> extends Map<K, V> {
  constructor: CollectionConstructor;
}

export class Collection<K, V> extends Map<K, V> {
  public ensure(
    key: K,
    defaultValueGenerator: (key: K, collection: this) => V
  ): V {
    if (this.has(key)) return this.get(key)!;
    if (typeof defaultValueGenerator !== "function")
      throw new TypeError(`${defaultValueGenerator} is not a function`);
    const defaultValue = defaultValueGenerator(key, this);
    this.set(key, defaultValue);
    return defaultValue;
  }

  // ... (Other methods)

  // Now let's add the 'add' function:
  public add(key: K, value: V): void {
    this.set(key, value);
  }

  // New 'find' function
  public find(
    predicate: (value: V, key: K, collection: this) => boolean
  ): V | undefined {
    for (const [key, value] of this.entries()) {
      if (predicate(value, key, this)) {
        return value;
      }
    }
    return undefined;
  }

  // New 'filter' function
  public filter(
    predicate: (value: V, key: K, collection: this) => boolean
  ): Collection<K, V> {
    const coll = new this.constructor[Symbol.species]<K, V>();
    for (const [key, value] of this) {
      if (predicate(value, key, this)) {
        coll.set(key, value);
      }
    }
    return coll;
  }

  // New 'first' function
  public first(): V | undefined {
    return this.values().next().value;
  }

  public sort(compareFunction: Comparator<K, V> = Collection.defaultSort) {
    const entries = [...this.entries()];
    entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));

    this.clear();
    for (const [key, value] of entries) {
      this.set(key, value);
    }

    return this;
  }

  private static defaultSort<V>(firstValue: V, secondValue: V): number {
    return (
      Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1
    );
  }

  public intersect<T>(other: ReadonlyCollection<K, T>): Collection<K, T> {
    const coll = new this.constructor[Symbol.species]<K, T>();
    for (const [key, value] of other) {
      if (this.has(key) && Object.is(value, this.get(key))) {
        coll.set(key, value);
      }
    }

    return coll;
  }

  public subtract<T>(other: ReadonlyCollection<K, T>): Collection<K, V> {
    const coll = new this.constructor[Symbol.species]<K, V>();
    for (const [key, value] of this) {
      if (!other.has(key) || !Object.is(value, other.get(key))) {
        coll.set(key, value);
      }
    }

    return coll;
  }
}

export type Comparator<K, V> = (
  firstValue: V,
  secondValue: V,
  firstKey: K,
  secondKey: K
) => number;
