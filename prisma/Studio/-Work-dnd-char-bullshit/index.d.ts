import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.9.0
 * Query Engine version: 369b3694b7edb869fad14827a33ad3f3f49bbc20
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Characters
 * const characters = await prisma.character.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Characters
   * const characters = await prisma.character.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.character`: Exposes CRUD operations for the **Character** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Characters
    * const characters = await prisma.character.findMany()
    * ```
    */
  get character(): CharacterDelegate;

  /**
   * `prisma.characterEquipment`: Exposes CRUD operations for the **CharacterEquipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharacterEquipments
    * const characterEquipments = await prisma.characterEquipment.findMany()
    * ```
    */
  get characterEquipment(): CharacterEquipmentDelegate;

  /**
   * `prisma.characterSkills`: Exposes CRUD operations for the **CharacterSkills** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharacterSkills
    * const characterSkills = await prisma.characterSkills.findMany()
    * ```
    */
  get characterSkills(): CharacterSkillsDelegate;

  /**
   * `prisma.characterSpells`: Exposes CRUD operations for the **CharacterSpells** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharacterSpells
    * const characterSpells = await prisma.characterSpells.findMany()
    * ```
    */
  get characterSpells(): CharacterSpellsDelegate;

  /**
   * `prisma.equipment`: Exposes CRUD operations for the **Equipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Equipment
    * const equipment = await prisma.equipment.findMany()
    * ```
    */
  get equipment(): EquipmentDelegate;

  /**
   * `prisma.diceModifier`: Exposes CRUD operations for the **DiceModifier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiceModifiers
    * const diceModifiers = await prisma.diceModifier.findMany()
    * ```
    */
  get diceModifier(): DiceModifierDelegate;

  /**
   * `prisma.race`: Exposes CRUD operations for the **Race** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Races
    * const races = await prisma.race.findMany()
    * ```
    */
  get race(): RaceDelegate;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): ClassDelegate;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): SkillDelegate;

  /**
   * `prisma.spell`: Exposes CRUD operations for the **Spell** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spells
    * const spells = await prisma.spell.findMany()
    * ```
    */
  get spell(): SpellDelegate;

  /**
   * `prisma.subClass`: Exposes CRUD operations for the **SubClass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubClasses
    * const subClasses = await prisma.subClass.findMany()
    * ```
    */
  get subClass(): SubClassDelegate;

  /**
   * `prisma.deity`: Exposes CRUD operations for the **Deity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deities
    * const deities = await prisma.deity.findMany()
    * ```
    */
  get deity(): DeityDelegate;

  /**
   * `prisma.proficiency`: Exposes CRUD operations for the **Proficiency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proficiencies
    * const proficiencies = await prisma.proficiency.findMany()
    * ```
    */
  get proficiency(): ProficiencyDelegate;

  /**
   * `prisma.trait`: Exposes CRUD operations for the **Trait** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Traits
    * const traits = await prisma.trait.findMany()
    * ```
    */
  get trait(): TraitDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const CharacterDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  raceId: 'raceId',
  classId: 'classId',
  alignment: 'alignment',
  experience: 'experience',
  background: 'background',
  personality: 'personality',
  ideals: 'ideals',
  bonds: 'bonds',
  flaw: 'flaw',
  hp: 'hp',
  temphp: 'temphp',
  maxhp: 'maxhp',
  strength: 'strength',
  dexterity: 'dexterity',
  intelligence: 'intelligence',
  wisdom: 'wisdom',
  charisma: 'charisma',
  age: 'age',
  size: 'size',
  height: 'height',
  weight: 'weight',
  eyes: 'eyes',
  skin: 'skin',
  hair: 'hair',
  appearance: 'appearance',
  allies_org: 'allies_org',
  backstory: 'backstory',
  treasure: 'treasure'
};

export declare type CharacterDistinctFieldEnum = (typeof CharacterDistinctFieldEnum)[keyof typeof CharacterDistinctFieldEnum]


export declare const CharacterEquipmentDistinctFieldEnum: {
  id: 'id',
  characterId: 'characterId',
  equipmentId: 'equipmentId'
};

export declare type CharacterEquipmentDistinctFieldEnum = (typeof CharacterEquipmentDistinctFieldEnum)[keyof typeof CharacterEquipmentDistinctFieldEnum]


export declare const CharacterSkillsDistinctFieldEnum: {
  id: 'id',
  characterId: 'characterId',
  skillId: 'skillId'
};

export declare type CharacterSkillsDistinctFieldEnum = (typeof CharacterSkillsDistinctFieldEnum)[keyof typeof CharacterSkillsDistinctFieldEnum]


export declare const CharacterSpellsDistinctFieldEnum: {
  id: 'id',
  characterId: 'characterId',
  spellId: 'spellId'
};

export declare type CharacterSpellsDistinctFieldEnum = (typeof CharacterSpellsDistinctFieldEnum)[keyof typeof CharacterSpellsDistinctFieldEnum]


export declare const EquipmentDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  type: 'type',
  description: 'description'
};

export declare type EquipmentDistinctFieldEnum = (typeof EquipmentDistinctFieldEnum)[keyof typeof EquipmentDistinctFieldEnum]


export declare const DiceModifierDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  scope: 'scope',
  diceSides: 'diceSides',
  rollType: 'rollType'
};

export declare type DiceModifierDistinctFieldEnum = (typeof DiceModifierDistinctFieldEnum)[keyof typeof DiceModifierDistinctFieldEnum]


export declare const RaceDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type RaceDistinctFieldEnum = (typeof RaceDistinctFieldEnum)[keyof typeof RaceDistinctFieldEnum]


export declare const ClassDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  hitdice: 'hitdice',
  hpfirstlevel: 'hpfirstlevel',
  hpperlevel: 'hpperlevel',
  hpperlevel_roll: 'hpperlevel_roll'
};

export declare type ClassDistinctFieldEnum = (typeof ClassDistinctFieldEnum)[keyof typeof ClassDistinctFieldEnum]


export declare const SkillDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type SkillDistinctFieldEnum = (typeof SkillDistinctFieldEnum)[keyof typeof SkillDistinctFieldEnum]


export declare const SpellDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type SpellDistinctFieldEnum = (typeof SpellDistinctFieldEnum)[keyof typeof SpellDistinctFieldEnum]


export declare const SubClassDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type SubClassDistinctFieldEnum = (typeof SubClassDistinctFieldEnum)[keyof typeof SubClassDistinctFieldEnum]


export declare const DeityDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type DeityDistinctFieldEnum = (typeof DeityDistinctFieldEnum)[keyof typeof DeityDistinctFieldEnum]


export declare const ProficiencyDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  classId: 'classId'
};

export declare type ProficiencyDistinctFieldEnum = (typeof ProficiencyDistinctFieldEnum)[keyof typeof ProficiencyDistinctFieldEnum]


export declare const TraitDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  description: 'description',
  level: 'level',
  classId: 'classId'
};

export declare type TraitDistinctFieldEnum = (typeof TraitDistinctFieldEnum)[keyof typeof TraitDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model Character
 */

export type Character = {
  id: number
  createdAt: Date
  name: string | null
  raceId: number
  classId: number
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
}


export type AggregateCharacter = {
  count: number
  avg: CharacterAvgAggregateOutputType | null
  sum: CharacterSumAggregateOutputType | null
  min: CharacterMinAggregateOutputType | null
  max: CharacterMaxAggregateOutputType | null
}

export type CharacterAvgAggregateOutputType = {
  id: number
  raceId: number
  classId: number
  experience: number
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
}

export type CharacterSumAggregateOutputType = {
  id: number
  raceId: number
  classId: number
  experience: number
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
}

export type CharacterMinAggregateOutputType = {
  id: number
  raceId: number
  classId: number
  experience: number
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
}

export type CharacterMaxAggregateOutputType = {
  id: number
  raceId: number
  classId: number
  experience: number
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
}


export type CharacterAvgAggregateInputType = {
  id?: true
  raceId?: true
  classId?: true
  experience?: true
  hp?: true
  temphp?: true
  maxhp?: true
  strength?: true
  dexterity?: true
  intelligence?: true
  wisdom?: true
  charisma?: true
  age?: true
}

export type CharacterSumAggregateInputType = {
  id?: true
  raceId?: true
  classId?: true
  experience?: true
  hp?: true
  temphp?: true
  maxhp?: true
  strength?: true
  dexterity?: true
  intelligence?: true
  wisdom?: true
  charisma?: true
  age?: true
}

export type CharacterMinAggregateInputType = {
  id?: true
  raceId?: true
  classId?: true
  experience?: true
  hp?: true
  temphp?: true
  maxhp?: true
  strength?: true
  dexterity?: true
  intelligence?: true
  wisdom?: true
  charisma?: true
  age?: true
}

export type CharacterMaxAggregateInputType = {
  id?: true
  raceId?: true
  classId?: true
  experience?: true
  hp?: true
  temphp?: true
  maxhp?: true
  strength?: true
  dexterity?: true
  intelligence?: true
  wisdom?: true
  charisma?: true
  age?: true
}

export type AggregateCharacterArgs = {
  where?: CharacterWhereInput
  orderBy?: Enumerable<CharacterOrderByInput> | CharacterOrderByInput
  cursor?: CharacterWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterDistinctFieldEnum>
  count?: true
  avg?: CharacterAvgAggregateInputType
  sum?: CharacterSumAggregateInputType
  min?: CharacterMinAggregateInputType
  max?: CharacterMaxAggregateInputType
}

export type GetCharacterAggregateType<T extends AggregateCharacterArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCharacterAggregateScalarType<T[P]>
}

export type GetCharacterAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterAvgAggregateOutputType ? CharacterAvgAggregateOutputType[P] : never
}
    
    

export type CharacterSelect = {
  id?: boolean
  createdAt?: boolean
  name?: boolean
  race?: boolean | RaceArgs
  raceId?: boolean
  class?: boolean | ClassArgs
  classId?: boolean
  alignment?: boolean
  experience?: boolean
  background?: boolean
  personality?: boolean
  ideals?: boolean
  bonds?: boolean
  flaw?: boolean
  hp?: boolean
  temphp?: boolean
  maxhp?: boolean
  strength?: boolean
  dexterity?: boolean
  intelligence?: boolean
  wisdom?: boolean
  charisma?: boolean
  age?: boolean
  size?: boolean
  height?: boolean
  weight?: boolean
  eyes?: boolean
  skin?: boolean
  hair?: boolean
  appearance?: boolean
  allies_org?: boolean
  backstory?: boolean
  treasure?: boolean
  equipment?: boolean | FindManyCharacterEquipmentArgs
  CharacterSkills?: boolean | FindManyCharacterSkillsArgs
  CharacterSpells?: boolean | FindManyCharacterSpellsArgs
}

export type CharacterInclude = {
  race?: boolean | RaceArgs
  class?: boolean | ClassArgs
  equipment?: boolean | FindManyCharacterEquipmentArgs
  CharacterSkills?: boolean | FindManyCharacterSkillsArgs
  CharacterSpells?: boolean | FindManyCharacterSpellsArgs
}

export type CharacterGetPayload<
  S extends boolean | null | undefined | CharacterArgs,
  U = keyof S
> = S extends true
  ? Character
  : S extends undefined
  ? never
  : S extends CharacterArgs | FindManyCharacterArgs
  ? 'include' extends U
    ? Character  & {
      [P in TrueKeys<S['include']>]:
      P extends 'race'
      ? RaceGetPayload<S['include'][P]> :
      P extends 'class'
      ? ClassGetPayload<S['include'][P]> :
      P extends 'equipment'
      ? Array<CharacterEquipmentGetPayload<S['include'][P]>> :
      P extends 'CharacterSkills'
      ? Array<CharacterSkillsGetPayload<S['include'][P]>> :
      P extends 'CharacterSpells'
      ? Array<CharacterSpellsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Character ? Character[P]
: 
      P extends 'race'
      ? RaceGetPayload<S['select'][P]> :
      P extends 'class'
      ? ClassGetPayload<S['select'][P]> :
      P extends 'equipment'
      ? Array<CharacterEquipmentGetPayload<S['select'][P]>> :
      P extends 'CharacterSkills'
      ? Array<CharacterSkillsGetPayload<S['select'][P]>> :
      P extends 'CharacterSpells'
      ? Array<CharacterSpellsGetPayload<S['select'][P]>> : never
    }
  : Character
: Character


export interface CharacterDelegate {
  /**
   * Find zero or one Character that matches the filter.
   * @param {FindOneCharacterArgs} args - Arguments to find a Character
   * @example
   * // Get one Character
   * const character = await prisma.character.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCharacterArgs>(
    args: Subset<T, FindOneCharacterArgs>
  ): CheckSelect<T, Prisma__CharacterClient<Character | null>, Prisma__CharacterClient<CharacterGetPayload<T> | null>>
  /**
   * Find the first Character that matches the filter.
   * @param {FindFirstCharacterArgs} args - Arguments to find a Character
   * @example
   * // Get one Character
   * const character = await prisma.character.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCharacterArgs>(
    args?: Subset<T, FindFirstCharacterArgs>
  ): CheckSelect<T, Prisma__CharacterClient<Character | null>, Prisma__CharacterClient<CharacterGetPayload<T> | null>>
  /**
   * Find zero or more Characters that matches the filter.
   * @param {FindManyCharacterArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Characters
   * const characters = await prisma.character.findMany()
   * 
   * // Get first 10 Characters
   * const characters = await prisma.character.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const characterWithIdOnly = await prisma.character.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCharacterArgs>(
    args?: Subset<T, FindManyCharacterArgs>
  ): CheckSelect<T, Promise<Array<Character>>, Promise<Array<CharacterGetPayload<T>>>>
  /**
   * Create a Character.
   * @param {CharacterCreateArgs} args - Arguments to create a Character.
   * @example
   * // Create one Character
   * const Character = await prisma.character.create({
   *   data: {
   *     // ... data to create a Character
   *   }
   * })
   * 
  **/
  create<T extends CharacterCreateArgs>(
    args: Subset<T, CharacterCreateArgs>
  ): CheckSelect<T, Prisma__CharacterClient<Character>, Prisma__CharacterClient<CharacterGetPayload<T>>>
  /**
   * Delete a Character.
   * @param {CharacterDeleteArgs} args - Arguments to delete one Character.
   * @example
   * // Delete one Character
   * const Character = await prisma.character.delete({
   *   where: {
   *     // ... filter to delete one Character
   *   }
   * })
   * 
  **/
  delete<T extends CharacterDeleteArgs>(
    args: Subset<T, CharacterDeleteArgs>
  ): CheckSelect<T, Prisma__CharacterClient<Character>, Prisma__CharacterClient<CharacterGetPayload<T>>>
  /**
   * Update one Character.
   * @param {CharacterUpdateArgs} args - Arguments to update one Character.
   * @example
   * // Update one Character
   * const character = await prisma.character.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CharacterUpdateArgs>(
    args: Subset<T, CharacterUpdateArgs>
  ): CheckSelect<T, Prisma__CharacterClient<Character>, Prisma__CharacterClient<CharacterGetPayload<T>>>
  /**
   * Delete zero or more Characters.
   * @param {CharacterDeleteManyArgs} args - Arguments to filter Characters to delete.
   * @example
   * // Delete a few Characters
   * const { count } = await prisma.character.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CharacterDeleteManyArgs>(
    args: Subset<T, CharacterDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Characters.
   * @param {CharacterUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Characters
   * const character = await prisma.character.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CharacterUpdateManyArgs>(
    args: Subset<T, CharacterUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Character.
   * @param {CharacterUpsertArgs} args - Arguments to update or create a Character.
   * @example
   * // Update or create a Character
   * const character = await prisma.character.upsert({
   *   create: {
   *     // ... data to create a Character
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Character we want to update
   *   }
   * })
  **/
  upsert<T extends CharacterUpsertArgs>(
    args: Subset<T, CharacterUpsertArgs>
  ): CheckSelect<T, Prisma__CharacterClient<Character>, Prisma__CharacterClient<CharacterGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCharacterArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterArgs>(args: Subset<T, AggregateCharacterArgs>): Promise<GetCharacterAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Character.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  race<T extends RaceArgs = {}>(args?: Subset<T, RaceArgs>): CheckSelect<T, Prisma__RaceClient<Race | null>, Prisma__RaceClient<RaceGetPayload<T> | null>>;

  class<T extends ClassArgs = {}>(args?: Subset<T, ClassArgs>): CheckSelect<T, Prisma__ClassClient<Class | null>, Prisma__ClassClient<ClassGetPayload<T> | null>>;

  equipment<T extends FindManyCharacterEquipmentArgs = {}>(args?: Subset<T, FindManyCharacterEquipmentArgs>): CheckSelect<T, Promise<Array<CharacterEquipment>>, Promise<Array<CharacterEquipmentGetPayload<T>>>>;

  CharacterSkills<T extends FindManyCharacterSkillsArgs = {}>(args?: Subset<T, FindManyCharacterSkillsArgs>): CheckSelect<T, Promise<Array<CharacterSkills>>, Promise<Array<CharacterSkillsGetPayload<T>>>>;

  CharacterSpells<T extends FindManyCharacterSpellsArgs = {}>(args?: Subset<T, FindManyCharacterSpellsArgs>): CheckSelect<T, Promise<Array<CharacterSpells>>, Promise<Array<CharacterSpellsGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Character findOne
 */
export type FindOneCharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * Filter, which Character to fetch.
  **/
  where: CharacterWhereUniqueInput
}


/**
 * Character findFirst
 */
export type FindFirstCharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * Filter, which Character to fetch.
  **/
  where?: CharacterWhereInput
  orderBy?: Enumerable<CharacterOrderByInput> | CharacterOrderByInput
  cursor?: CharacterWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterDistinctFieldEnum>
}


/**
 * Character findMany
 */
export type FindManyCharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * Filter, which Characters to fetch.
  **/
  where?: CharacterWhereInput
  /**
   * Determine the order of the Characters to fetch.
  **/
  orderBy?: Enumerable<CharacterOrderByInput> | CharacterOrderByInput
  /**
   * Sets the position for listing Characters.
  **/
  cursor?: CharacterWhereUniqueInput
  /**
   * The number of Characters to fetch. If negative number, it will take Characters before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Characters.
  **/
  skip?: number
  distinct?: Enumerable<CharacterDistinctFieldEnum>
}


/**
 * Character create
 */
export type CharacterCreateArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * The data needed to create a Character.
  **/
  data: CharacterCreateInput
}


/**
 * Character update
 */
export type CharacterUpdateArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * The data needed to update a Character.
  **/
  data: CharacterUpdateInput
  /**
   * Choose, which Character to update.
  **/
  where: CharacterWhereUniqueInput
}


/**
 * Character updateMany
 */
export type CharacterUpdateManyArgs = {
  data: CharacterUpdateManyMutationInput
  where?: CharacterWhereInput
}


/**
 * Character upsert
 */
export type CharacterUpsertArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * The filter to search for the Character to update in case it exists.
  **/
  where: CharacterWhereUniqueInput
  /**
   * In case the Character found by the `where` argument doesn't exist, create a new Character with this data.
  **/
  create: CharacterCreateInput
  /**
   * In case the Character was found with the provided `where` argument, update it with this data.
  **/
  update: CharacterUpdateInput
}


/**
 * Character delete
 */
export type CharacterDeleteArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
  /**
   * Filter which Character to delete.
  **/
  where: CharacterWhereUniqueInput
}


/**
 * Character deleteMany
 */
export type CharacterDeleteManyArgs = {
  where?: CharacterWhereInput
}


/**
 * Character without action
 */
export type CharacterArgs = {
  /**
   * Select specific fields to fetch from the Character
  **/
  select?: CharacterSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterInclude | null
}



/**
 * Model CharacterEquipment
 */

export type CharacterEquipment = {
  id: number
  characterId: number
  equipmentId: number
}


export type AggregateCharacterEquipment = {
  count: number
  avg: CharacterEquipmentAvgAggregateOutputType | null
  sum: CharacterEquipmentSumAggregateOutputType | null
  min: CharacterEquipmentMinAggregateOutputType | null
  max: CharacterEquipmentMaxAggregateOutputType | null
}

export type CharacterEquipmentAvgAggregateOutputType = {
  id: number
  characterId: number
  equipmentId: number
}

export type CharacterEquipmentSumAggregateOutputType = {
  id: number
  characterId: number
  equipmentId: number
}

export type CharacterEquipmentMinAggregateOutputType = {
  id: number
  characterId: number
  equipmentId: number
}

export type CharacterEquipmentMaxAggregateOutputType = {
  id: number
  characterId: number
  equipmentId: number
}


export type CharacterEquipmentAvgAggregateInputType = {
  id?: true
  characterId?: true
  equipmentId?: true
}

export type CharacterEquipmentSumAggregateInputType = {
  id?: true
  characterId?: true
  equipmentId?: true
}

export type CharacterEquipmentMinAggregateInputType = {
  id?: true
  characterId?: true
  equipmentId?: true
}

export type CharacterEquipmentMaxAggregateInputType = {
  id?: true
  characterId?: true
  equipmentId?: true
}

export type AggregateCharacterEquipmentArgs = {
  where?: CharacterEquipmentWhereInput
  orderBy?: Enumerable<CharacterEquipmentOrderByInput> | CharacterEquipmentOrderByInput
  cursor?: CharacterEquipmentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterEquipmentDistinctFieldEnum>
  count?: true
  avg?: CharacterEquipmentAvgAggregateInputType
  sum?: CharacterEquipmentSumAggregateInputType
  min?: CharacterEquipmentMinAggregateInputType
  max?: CharacterEquipmentMaxAggregateInputType
}

export type GetCharacterEquipmentAggregateType<T extends AggregateCharacterEquipmentArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCharacterEquipmentAggregateScalarType<T[P]>
}

export type GetCharacterEquipmentAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterEquipmentAvgAggregateOutputType ? CharacterEquipmentAvgAggregateOutputType[P] : never
}
    
    

export type CharacterEquipmentSelect = {
  id?: boolean
  character?: boolean | CharacterArgs
  item?: boolean | EquipmentArgs
  characterId?: boolean
  equipmentId?: boolean
}

export type CharacterEquipmentInclude = {
  character?: boolean | CharacterArgs
  item?: boolean | EquipmentArgs
}

export type CharacterEquipmentGetPayload<
  S extends boolean | null | undefined | CharacterEquipmentArgs,
  U = keyof S
> = S extends true
  ? CharacterEquipment
  : S extends undefined
  ? never
  : S extends CharacterEquipmentArgs | FindManyCharacterEquipmentArgs
  ? 'include' extends U
    ? CharacterEquipment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'character'
      ? CharacterGetPayload<S['include'][P]> :
      P extends 'item'
      ? EquipmentGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof CharacterEquipment ? CharacterEquipment[P]
: 
      P extends 'character'
      ? CharacterGetPayload<S['select'][P]> :
      P extends 'item'
      ? EquipmentGetPayload<S['select'][P]> : never
    }
  : CharacterEquipment
: CharacterEquipment


export interface CharacterEquipmentDelegate {
  /**
   * Find zero or one CharacterEquipment that matches the filter.
   * @param {FindOneCharacterEquipmentArgs} args - Arguments to find a CharacterEquipment
   * @example
   * // Get one CharacterEquipment
   * const characterEquipment = await prisma.characterEquipment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCharacterEquipmentArgs>(
    args: Subset<T, FindOneCharacterEquipmentArgs>
  ): CheckSelect<T, Prisma__CharacterEquipmentClient<CharacterEquipment | null>, Prisma__CharacterEquipmentClient<CharacterEquipmentGetPayload<T> | null>>
  /**
   * Find the first CharacterEquipment that matches the filter.
   * @param {FindFirstCharacterEquipmentArgs} args - Arguments to find a CharacterEquipment
   * @example
   * // Get one CharacterEquipment
   * const characterEquipment = await prisma.characterEquipment.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCharacterEquipmentArgs>(
    args?: Subset<T, FindFirstCharacterEquipmentArgs>
  ): CheckSelect<T, Prisma__CharacterEquipmentClient<CharacterEquipment | null>, Prisma__CharacterEquipmentClient<CharacterEquipmentGetPayload<T> | null>>
  /**
   * Find zero or more CharacterEquipments that matches the filter.
   * @param {FindManyCharacterEquipmentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CharacterEquipments
   * const characterEquipments = await prisma.characterEquipment.findMany()
   * 
   * // Get first 10 CharacterEquipments
   * const characterEquipments = await prisma.characterEquipment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const characterEquipmentWithIdOnly = await prisma.characterEquipment.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCharacterEquipmentArgs>(
    args?: Subset<T, FindManyCharacterEquipmentArgs>
  ): CheckSelect<T, Promise<Array<CharacterEquipment>>, Promise<Array<CharacterEquipmentGetPayload<T>>>>
  /**
   * Create a CharacterEquipment.
   * @param {CharacterEquipmentCreateArgs} args - Arguments to create a CharacterEquipment.
   * @example
   * // Create one CharacterEquipment
   * const CharacterEquipment = await prisma.characterEquipment.create({
   *   data: {
   *     // ... data to create a CharacterEquipment
   *   }
   * })
   * 
  **/
  create<T extends CharacterEquipmentCreateArgs>(
    args: Subset<T, CharacterEquipmentCreateArgs>
  ): CheckSelect<T, Prisma__CharacterEquipmentClient<CharacterEquipment>, Prisma__CharacterEquipmentClient<CharacterEquipmentGetPayload<T>>>
  /**
   * Delete a CharacterEquipment.
   * @param {CharacterEquipmentDeleteArgs} args - Arguments to delete one CharacterEquipment.
   * @example
   * // Delete one CharacterEquipment
   * const CharacterEquipment = await prisma.characterEquipment.delete({
   *   where: {
   *     // ... filter to delete one CharacterEquipment
   *   }
   * })
   * 
  **/
  delete<T extends CharacterEquipmentDeleteArgs>(
    args: Subset<T, CharacterEquipmentDeleteArgs>
  ): CheckSelect<T, Prisma__CharacterEquipmentClient<CharacterEquipment>, Prisma__CharacterEquipmentClient<CharacterEquipmentGetPayload<T>>>
  /**
   * Update one CharacterEquipment.
   * @param {CharacterEquipmentUpdateArgs} args - Arguments to update one CharacterEquipment.
   * @example
   * // Update one CharacterEquipment
   * const characterEquipment = await prisma.characterEquipment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CharacterEquipmentUpdateArgs>(
    args: Subset<T, CharacterEquipmentUpdateArgs>
  ): CheckSelect<T, Prisma__CharacterEquipmentClient<CharacterEquipment>, Prisma__CharacterEquipmentClient<CharacterEquipmentGetPayload<T>>>
  /**
   * Delete zero or more CharacterEquipments.
   * @param {CharacterEquipmentDeleteManyArgs} args - Arguments to filter CharacterEquipments to delete.
   * @example
   * // Delete a few CharacterEquipments
   * const { count } = await prisma.characterEquipment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CharacterEquipmentDeleteManyArgs>(
    args: Subset<T, CharacterEquipmentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more CharacterEquipments.
   * @param {CharacterEquipmentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CharacterEquipments
   * const characterEquipment = await prisma.characterEquipment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CharacterEquipmentUpdateManyArgs>(
    args: Subset<T, CharacterEquipmentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one CharacterEquipment.
   * @param {CharacterEquipmentUpsertArgs} args - Arguments to update or create a CharacterEquipment.
   * @example
   * // Update or create a CharacterEquipment
   * const characterEquipment = await prisma.characterEquipment.upsert({
   *   create: {
   *     // ... data to create a CharacterEquipment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CharacterEquipment we want to update
   *   }
   * })
  **/
  upsert<T extends CharacterEquipmentUpsertArgs>(
    args: Subset<T, CharacterEquipmentUpsertArgs>
  ): CheckSelect<T, Prisma__CharacterEquipmentClient<CharacterEquipment>, Prisma__CharacterEquipmentClient<CharacterEquipmentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCharacterEquipmentArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterEquipmentArgs>(args: Subset<T, AggregateCharacterEquipmentArgs>): Promise<GetCharacterEquipmentAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for CharacterEquipment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterEquipmentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  character<T extends CharacterArgs = {}>(args?: Subset<T, CharacterArgs>): CheckSelect<T, Prisma__CharacterClient<Character | null>, Prisma__CharacterClient<CharacterGetPayload<T> | null>>;

  item<T extends EquipmentArgs = {}>(args?: Subset<T, EquipmentArgs>): CheckSelect<T, Prisma__EquipmentClient<Equipment | null>, Prisma__EquipmentClient<EquipmentGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CharacterEquipment findOne
 */
export type FindOneCharacterEquipmentArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * Filter, which CharacterEquipment to fetch.
  **/
  where: CharacterEquipmentWhereUniqueInput
}


/**
 * CharacterEquipment findFirst
 */
export type FindFirstCharacterEquipmentArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * Filter, which CharacterEquipment to fetch.
  **/
  where?: CharacterEquipmentWhereInput
  orderBy?: Enumerable<CharacterEquipmentOrderByInput> | CharacterEquipmentOrderByInput
  cursor?: CharacterEquipmentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterEquipmentDistinctFieldEnum>
}


/**
 * CharacterEquipment findMany
 */
export type FindManyCharacterEquipmentArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * Filter, which CharacterEquipments to fetch.
  **/
  where?: CharacterEquipmentWhereInput
  /**
   * Determine the order of the CharacterEquipments to fetch.
  **/
  orderBy?: Enumerable<CharacterEquipmentOrderByInput> | CharacterEquipmentOrderByInput
  /**
   * Sets the position for listing CharacterEquipments.
  **/
  cursor?: CharacterEquipmentWhereUniqueInput
  /**
   * The number of CharacterEquipments to fetch. If negative number, it will take CharacterEquipments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` CharacterEquipments.
  **/
  skip?: number
  distinct?: Enumerable<CharacterEquipmentDistinctFieldEnum>
}


/**
 * CharacterEquipment create
 */
export type CharacterEquipmentCreateArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * The data needed to create a CharacterEquipment.
  **/
  data: CharacterEquipmentCreateInput
}


/**
 * CharacterEquipment update
 */
export type CharacterEquipmentUpdateArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * The data needed to update a CharacterEquipment.
  **/
  data: CharacterEquipmentUpdateInput
  /**
   * Choose, which CharacterEquipment to update.
  **/
  where: CharacterEquipmentWhereUniqueInput
}


/**
 * CharacterEquipment updateMany
 */
export type CharacterEquipmentUpdateManyArgs = {
  data: CharacterEquipmentUpdateManyMutationInput
  where?: CharacterEquipmentWhereInput
}


/**
 * CharacterEquipment upsert
 */
export type CharacterEquipmentUpsertArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * The filter to search for the CharacterEquipment to update in case it exists.
  **/
  where: CharacterEquipmentWhereUniqueInput
  /**
   * In case the CharacterEquipment found by the `where` argument doesn't exist, create a new CharacterEquipment with this data.
  **/
  create: CharacterEquipmentCreateInput
  /**
   * In case the CharacterEquipment was found with the provided `where` argument, update it with this data.
  **/
  update: CharacterEquipmentUpdateInput
}


/**
 * CharacterEquipment delete
 */
export type CharacterEquipmentDeleteArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
  /**
   * Filter which CharacterEquipment to delete.
  **/
  where: CharacterEquipmentWhereUniqueInput
}


/**
 * CharacterEquipment deleteMany
 */
export type CharacterEquipmentDeleteManyArgs = {
  where?: CharacterEquipmentWhereInput
}


/**
 * CharacterEquipment without action
 */
export type CharacterEquipmentArgs = {
  /**
   * Select specific fields to fetch from the CharacterEquipment
  **/
  select?: CharacterEquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterEquipmentInclude | null
}



/**
 * Model CharacterSkills
 */

export type CharacterSkills = {
  id: number
  characterId: number
  skillId: number
}


export type AggregateCharacterSkills = {
  count: number
  avg: CharacterSkillsAvgAggregateOutputType | null
  sum: CharacterSkillsSumAggregateOutputType | null
  min: CharacterSkillsMinAggregateOutputType | null
  max: CharacterSkillsMaxAggregateOutputType | null
}

export type CharacterSkillsAvgAggregateOutputType = {
  id: number
  characterId: number
  skillId: number
}

export type CharacterSkillsSumAggregateOutputType = {
  id: number
  characterId: number
  skillId: number
}

export type CharacterSkillsMinAggregateOutputType = {
  id: number
  characterId: number
  skillId: number
}

export type CharacterSkillsMaxAggregateOutputType = {
  id: number
  characterId: number
  skillId: number
}


export type CharacterSkillsAvgAggregateInputType = {
  id?: true
  characterId?: true
  skillId?: true
}

export type CharacterSkillsSumAggregateInputType = {
  id?: true
  characterId?: true
  skillId?: true
}

export type CharacterSkillsMinAggregateInputType = {
  id?: true
  characterId?: true
  skillId?: true
}

export type CharacterSkillsMaxAggregateInputType = {
  id?: true
  characterId?: true
  skillId?: true
}

export type AggregateCharacterSkillsArgs = {
  where?: CharacterSkillsWhereInput
  orderBy?: Enumerable<CharacterSkillsOrderByInput> | CharacterSkillsOrderByInput
  cursor?: CharacterSkillsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterSkillsDistinctFieldEnum>
  count?: true
  avg?: CharacterSkillsAvgAggregateInputType
  sum?: CharacterSkillsSumAggregateInputType
  min?: CharacterSkillsMinAggregateInputType
  max?: CharacterSkillsMaxAggregateInputType
}

export type GetCharacterSkillsAggregateType<T extends AggregateCharacterSkillsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCharacterSkillsAggregateScalarType<T[P]>
}

export type GetCharacterSkillsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterSkillsAvgAggregateOutputType ? CharacterSkillsAvgAggregateOutputType[P] : never
}
    
    

export type CharacterSkillsSelect = {
  id?: boolean
  character?: boolean | CharacterArgs
  skill?: boolean | SkillArgs
  characterId?: boolean
  skillId?: boolean
}

export type CharacterSkillsInclude = {
  character?: boolean | CharacterArgs
  skill?: boolean | SkillArgs
}

export type CharacterSkillsGetPayload<
  S extends boolean | null | undefined | CharacterSkillsArgs,
  U = keyof S
> = S extends true
  ? CharacterSkills
  : S extends undefined
  ? never
  : S extends CharacterSkillsArgs | FindManyCharacterSkillsArgs
  ? 'include' extends U
    ? CharacterSkills  & {
      [P in TrueKeys<S['include']>]:
      P extends 'character'
      ? CharacterGetPayload<S['include'][P]> :
      P extends 'skill'
      ? SkillGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof CharacterSkills ? CharacterSkills[P]
: 
      P extends 'character'
      ? CharacterGetPayload<S['select'][P]> :
      P extends 'skill'
      ? SkillGetPayload<S['select'][P]> : never
    }
  : CharacterSkills
: CharacterSkills


export interface CharacterSkillsDelegate {
  /**
   * Find zero or one CharacterSkills that matches the filter.
   * @param {FindOneCharacterSkillsArgs} args - Arguments to find a CharacterSkills
   * @example
   * // Get one CharacterSkills
   * const characterSkills = await prisma.characterSkills.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCharacterSkillsArgs>(
    args: Subset<T, FindOneCharacterSkillsArgs>
  ): CheckSelect<T, Prisma__CharacterSkillsClient<CharacterSkills | null>, Prisma__CharacterSkillsClient<CharacterSkillsGetPayload<T> | null>>
  /**
   * Find the first CharacterSkills that matches the filter.
   * @param {FindFirstCharacterSkillsArgs} args - Arguments to find a CharacterSkills
   * @example
   * // Get one CharacterSkills
   * const characterSkills = await prisma.characterSkills.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCharacterSkillsArgs>(
    args?: Subset<T, FindFirstCharacterSkillsArgs>
  ): CheckSelect<T, Prisma__CharacterSkillsClient<CharacterSkills | null>, Prisma__CharacterSkillsClient<CharacterSkillsGetPayload<T> | null>>
  /**
   * Find zero or more CharacterSkills that matches the filter.
   * @param {FindManyCharacterSkillsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CharacterSkills
   * const characterSkills = await prisma.characterSkills.findMany()
   * 
   * // Get first 10 CharacterSkills
   * const characterSkills = await prisma.characterSkills.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const characterSkillsWithIdOnly = await prisma.characterSkills.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCharacterSkillsArgs>(
    args?: Subset<T, FindManyCharacterSkillsArgs>
  ): CheckSelect<T, Promise<Array<CharacterSkills>>, Promise<Array<CharacterSkillsGetPayload<T>>>>
  /**
   * Create a CharacterSkills.
   * @param {CharacterSkillsCreateArgs} args - Arguments to create a CharacterSkills.
   * @example
   * // Create one CharacterSkills
   * const CharacterSkills = await prisma.characterSkills.create({
   *   data: {
   *     // ... data to create a CharacterSkills
   *   }
   * })
   * 
  **/
  create<T extends CharacterSkillsCreateArgs>(
    args: Subset<T, CharacterSkillsCreateArgs>
  ): CheckSelect<T, Prisma__CharacterSkillsClient<CharacterSkills>, Prisma__CharacterSkillsClient<CharacterSkillsGetPayload<T>>>
  /**
   * Delete a CharacterSkills.
   * @param {CharacterSkillsDeleteArgs} args - Arguments to delete one CharacterSkills.
   * @example
   * // Delete one CharacterSkills
   * const CharacterSkills = await prisma.characterSkills.delete({
   *   where: {
   *     // ... filter to delete one CharacterSkills
   *   }
   * })
   * 
  **/
  delete<T extends CharacterSkillsDeleteArgs>(
    args: Subset<T, CharacterSkillsDeleteArgs>
  ): CheckSelect<T, Prisma__CharacterSkillsClient<CharacterSkills>, Prisma__CharacterSkillsClient<CharacterSkillsGetPayload<T>>>
  /**
   * Update one CharacterSkills.
   * @param {CharacterSkillsUpdateArgs} args - Arguments to update one CharacterSkills.
   * @example
   * // Update one CharacterSkills
   * const characterSkills = await prisma.characterSkills.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CharacterSkillsUpdateArgs>(
    args: Subset<T, CharacterSkillsUpdateArgs>
  ): CheckSelect<T, Prisma__CharacterSkillsClient<CharacterSkills>, Prisma__CharacterSkillsClient<CharacterSkillsGetPayload<T>>>
  /**
   * Delete zero or more CharacterSkills.
   * @param {CharacterSkillsDeleteManyArgs} args - Arguments to filter CharacterSkills to delete.
   * @example
   * // Delete a few CharacterSkills
   * const { count } = await prisma.characterSkills.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CharacterSkillsDeleteManyArgs>(
    args: Subset<T, CharacterSkillsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more CharacterSkills.
   * @param {CharacterSkillsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CharacterSkills
   * const characterSkills = await prisma.characterSkills.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CharacterSkillsUpdateManyArgs>(
    args: Subset<T, CharacterSkillsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one CharacterSkills.
   * @param {CharacterSkillsUpsertArgs} args - Arguments to update or create a CharacterSkills.
   * @example
   * // Update or create a CharacterSkills
   * const characterSkills = await prisma.characterSkills.upsert({
   *   create: {
   *     // ... data to create a CharacterSkills
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CharacterSkills we want to update
   *   }
   * })
  **/
  upsert<T extends CharacterSkillsUpsertArgs>(
    args: Subset<T, CharacterSkillsUpsertArgs>
  ): CheckSelect<T, Prisma__CharacterSkillsClient<CharacterSkills>, Prisma__CharacterSkillsClient<CharacterSkillsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCharacterSkillsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterSkillsArgs>(args: Subset<T, AggregateCharacterSkillsArgs>): Promise<GetCharacterSkillsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for CharacterSkills.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterSkillsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  character<T extends CharacterArgs = {}>(args?: Subset<T, CharacterArgs>): CheckSelect<T, Prisma__CharacterClient<Character | null>, Prisma__CharacterClient<CharacterGetPayload<T> | null>>;

  skill<T extends SkillArgs = {}>(args?: Subset<T, SkillArgs>): CheckSelect<T, Prisma__SkillClient<Skill | null>, Prisma__SkillClient<SkillGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CharacterSkills findOne
 */
export type FindOneCharacterSkillsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * Filter, which CharacterSkills to fetch.
  **/
  where: CharacterSkillsWhereUniqueInput
}


/**
 * CharacterSkills findFirst
 */
export type FindFirstCharacterSkillsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * Filter, which CharacterSkills to fetch.
  **/
  where?: CharacterSkillsWhereInput
  orderBy?: Enumerable<CharacterSkillsOrderByInput> | CharacterSkillsOrderByInput
  cursor?: CharacterSkillsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterSkillsDistinctFieldEnum>
}


/**
 * CharacterSkills findMany
 */
export type FindManyCharacterSkillsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * Filter, which CharacterSkills to fetch.
  **/
  where?: CharacterSkillsWhereInput
  /**
   * Determine the order of the CharacterSkills to fetch.
  **/
  orderBy?: Enumerable<CharacterSkillsOrderByInput> | CharacterSkillsOrderByInput
  /**
   * Sets the position for listing CharacterSkills.
  **/
  cursor?: CharacterSkillsWhereUniqueInput
  /**
   * The number of CharacterSkills to fetch. If negative number, it will take CharacterSkills before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` CharacterSkills.
  **/
  skip?: number
  distinct?: Enumerable<CharacterSkillsDistinctFieldEnum>
}


/**
 * CharacterSkills create
 */
export type CharacterSkillsCreateArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * The data needed to create a CharacterSkills.
  **/
  data: CharacterSkillsCreateInput
}


/**
 * CharacterSkills update
 */
export type CharacterSkillsUpdateArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * The data needed to update a CharacterSkills.
  **/
  data: CharacterSkillsUpdateInput
  /**
   * Choose, which CharacterSkills to update.
  **/
  where: CharacterSkillsWhereUniqueInput
}


/**
 * CharacterSkills updateMany
 */
export type CharacterSkillsUpdateManyArgs = {
  data: CharacterSkillsUpdateManyMutationInput
  where?: CharacterSkillsWhereInput
}


/**
 * CharacterSkills upsert
 */
export type CharacterSkillsUpsertArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * The filter to search for the CharacterSkills to update in case it exists.
  **/
  where: CharacterSkillsWhereUniqueInput
  /**
   * In case the CharacterSkills found by the `where` argument doesn't exist, create a new CharacterSkills with this data.
  **/
  create: CharacterSkillsCreateInput
  /**
   * In case the CharacterSkills was found with the provided `where` argument, update it with this data.
  **/
  update: CharacterSkillsUpdateInput
}


/**
 * CharacterSkills delete
 */
export type CharacterSkillsDeleteArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
  /**
   * Filter which CharacterSkills to delete.
  **/
  where: CharacterSkillsWhereUniqueInput
}


/**
 * CharacterSkills deleteMany
 */
export type CharacterSkillsDeleteManyArgs = {
  where?: CharacterSkillsWhereInput
}


/**
 * CharacterSkills without action
 */
export type CharacterSkillsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSkills
  **/
  select?: CharacterSkillsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSkillsInclude | null
}



/**
 * Model CharacterSpells
 */

export type CharacterSpells = {
  id: number
  characterId: number
  spellId: number
}


export type AggregateCharacterSpells = {
  count: number
  avg: CharacterSpellsAvgAggregateOutputType | null
  sum: CharacterSpellsSumAggregateOutputType | null
  min: CharacterSpellsMinAggregateOutputType | null
  max: CharacterSpellsMaxAggregateOutputType | null
}

export type CharacterSpellsAvgAggregateOutputType = {
  id: number
  characterId: number
  spellId: number
}

export type CharacterSpellsSumAggregateOutputType = {
  id: number
  characterId: number
  spellId: number
}

export type CharacterSpellsMinAggregateOutputType = {
  id: number
  characterId: number
  spellId: number
}

export type CharacterSpellsMaxAggregateOutputType = {
  id: number
  characterId: number
  spellId: number
}


export type CharacterSpellsAvgAggregateInputType = {
  id?: true
  characterId?: true
  spellId?: true
}

export type CharacterSpellsSumAggregateInputType = {
  id?: true
  characterId?: true
  spellId?: true
}

export type CharacterSpellsMinAggregateInputType = {
  id?: true
  characterId?: true
  spellId?: true
}

export type CharacterSpellsMaxAggregateInputType = {
  id?: true
  characterId?: true
  spellId?: true
}

export type AggregateCharacterSpellsArgs = {
  where?: CharacterSpellsWhereInput
  orderBy?: Enumerable<CharacterSpellsOrderByInput> | CharacterSpellsOrderByInput
  cursor?: CharacterSpellsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterSpellsDistinctFieldEnum>
  count?: true
  avg?: CharacterSpellsAvgAggregateInputType
  sum?: CharacterSpellsSumAggregateInputType
  min?: CharacterSpellsMinAggregateInputType
  max?: CharacterSpellsMaxAggregateInputType
}

export type GetCharacterSpellsAggregateType<T extends AggregateCharacterSpellsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCharacterSpellsAggregateScalarType<T[P]>
}

export type GetCharacterSpellsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CharacterSpellsAvgAggregateOutputType ? CharacterSpellsAvgAggregateOutputType[P] : never
}
    
    

export type CharacterSpellsSelect = {
  id?: boolean
  character?: boolean | CharacterArgs
  spell?: boolean | SpellArgs
  characterId?: boolean
  spellId?: boolean
}

export type CharacterSpellsInclude = {
  character?: boolean | CharacterArgs
  spell?: boolean | SpellArgs
}

export type CharacterSpellsGetPayload<
  S extends boolean | null | undefined | CharacterSpellsArgs,
  U = keyof S
> = S extends true
  ? CharacterSpells
  : S extends undefined
  ? never
  : S extends CharacterSpellsArgs | FindManyCharacterSpellsArgs
  ? 'include' extends U
    ? CharacterSpells  & {
      [P in TrueKeys<S['include']>]:
      P extends 'character'
      ? CharacterGetPayload<S['include'][P]> :
      P extends 'spell'
      ? SpellGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof CharacterSpells ? CharacterSpells[P]
: 
      P extends 'character'
      ? CharacterGetPayload<S['select'][P]> :
      P extends 'spell'
      ? SpellGetPayload<S['select'][P]> : never
    }
  : CharacterSpells
: CharacterSpells


export interface CharacterSpellsDelegate {
  /**
   * Find zero or one CharacterSpells that matches the filter.
   * @param {FindOneCharacterSpellsArgs} args - Arguments to find a CharacterSpells
   * @example
   * // Get one CharacterSpells
   * const characterSpells = await prisma.characterSpells.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCharacterSpellsArgs>(
    args: Subset<T, FindOneCharacterSpellsArgs>
  ): CheckSelect<T, Prisma__CharacterSpellsClient<CharacterSpells | null>, Prisma__CharacterSpellsClient<CharacterSpellsGetPayload<T> | null>>
  /**
   * Find the first CharacterSpells that matches the filter.
   * @param {FindFirstCharacterSpellsArgs} args - Arguments to find a CharacterSpells
   * @example
   * // Get one CharacterSpells
   * const characterSpells = await prisma.characterSpells.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCharacterSpellsArgs>(
    args?: Subset<T, FindFirstCharacterSpellsArgs>
  ): CheckSelect<T, Prisma__CharacterSpellsClient<CharacterSpells | null>, Prisma__CharacterSpellsClient<CharacterSpellsGetPayload<T> | null>>
  /**
   * Find zero or more CharacterSpells that matches the filter.
   * @param {FindManyCharacterSpellsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CharacterSpells
   * const characterSpells = await prisma.characterSpells.findMany()
   * 
   * // Get first 10 CharacterSpells
   * const characterSpells = await prisma.characterSpells.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const characterSpellsWithIdOnly = await prisma.characterSpells.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCharacterSpellsArgs>(
    args?: Subset<T, FindManyCharacterSpellsArgs>
  ): CheckSelect<T, Promise<Array<CharacterSpells>>, Promise<Array<CharacterSpellsGetPayload<T>>>>
  /**
   * Create a CharacterSpells.
   * @param {CharacterSpellsCreateArgs} args - Arguments to create a CharacterSpells.
   * @example
   * // Create one CharacterSpells
   * const CharacterSpells = await prisma.characterSpells.create({
   *   data: {
   *     // ... data to create a CharacterSpells
   *   }
   * })
   * 
  **/
  create<T extends CharacterSpellsCreateArgs>(
    args: Subset<T, CharacterSpellsCreateArgs>
  ): CheckSelect<T, Prisma__CharacterSpellsClient<CharacterSpells>, Prisma__CharacterSpellsClient<CharacterSpellsGetPayload<T>>>
  /**
   * Delete a CharacterSpells.
   * @param {CharacterSpellsDeleteArgs} args - Arguments to delete one CharacterSpells.
   * @example
   * // Delete one CharacterSpells
   * const CharacterSpells = await prisma.characterSpells.delete({
   *   where: {
   *     // ... filter to delete one CharacterSpells
   *   }
   * })
   * 
  **/
  delete<T extends CharacterSpellsDeleteArgs>(
    args: Subset<T, CharacterSpellsDeleteArgs>
  ): CheckSelect<T, Prisma__CharacterSpellsClient<CharacterSpells>, Prisma__CharacterSpellsClient<CharacterSpellsGetPayload<T>>>
  /**
   * Update one CharacterSpells.
   * @param {CharacterSpellsUpdateArgs} args - Arguments to update one CharacterSpells.
   * @example
   * // Update one CharacterSpells
   * const characterSpells = await prisma.characterSpells.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CharacterSpellsUpdateArgs>(
    args: Subset<T, CharacterSpellsUpdateArgs>
  ): CheckSelect<T, Prisma__CharacterSpellsClient<CharacterSpells>, Prisma__CharacterSpellsClient<CharacterSpellsGetPayload<T>>>
  /**
   * Delete zero or more CharacterSpells.
   * @param {CharacterSpellsDeleteManyArgs} args - Arguments to filter CharacterSpells to delete.
   * @example
   * // Delete a few CharacterSpells
   * const { count } = await prisma.characterSpells.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CharacterSpellsDeleteManyArgs>(
    args: Subset<T, CharacterSpellsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more CharacterSpells.
   * @param {CharacterSpellsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CharacterSpells
   * const characterSpells = await prisma.characterSpells.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CharacterSpellsUpdateManyArgs>(
    args: Subset<T, CharacterSpellsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one CharacterSpells.
   * @param {CharacterSpellsUpsertArgs} args - Arguments to update or create a CharacterSpells.
   * @example
   * // Update or create a CharacterSpells
   * const characterSpells = await prisma.characterSpells.upsert({
   *   create: {
   *     // ... data to create a CharacterSpells
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CharacterSpells we want to update
   *   }
   * })
  **/
  upsert<T extends CharacterSpellsUpsertArgs>(
    args: Subset<T, CharacterSpellsUpsertArgs>
  ): CheckSelect<T, Prisma__CharacterSpellsClient<CharacterSpells>, Prisma__CharacterSpellsClient<CharacterSpellsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCharacterSpellsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCharacterSpellsArgs>(args: Subset<T, AggregateCharacterSpellsArgs>): Promise<GetCharacterSpellsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for CharacterSpells.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CharacterSpellsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  character<T extends CharacterArgs = {}>(args?: Subset<T, CharacterArgs>): CheckSelect<T, Prisma__CharacterClient<Character | null>, Prisma__CharacterClient<CharacterGetPayload<T> | null>>;

  spell<T extends SpellArgs = {}>(args?: Subset<T, SpellArgs>): CheckSelect<T, Prisma__SpellClient<Spell | null>, Prisma__SpellClient<SpellGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CharacterSpells findOne
 */
export type FindOneCharacterSpellsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * Filter, which CharacterSpells to fetch.
  **/
  where: CharacterSpellsWhereUniqueInput
}


/**
 * CharacterSpells findFirst
 */
export type FindFirstCharacterSpellsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * Filter, which CharacterSpells to fetch.
  **/
  where?: CharacterSpellsWhereInput
  orderBy?: Enumerable<CharacterSpellsOrderByInput> | CharacterSpellsOrderByInput
  cursor?: CharacterSpellsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CharacterSpellsDistinctFieldEnum>
}


/**
 * CharacterSpells findMany
 */
export type FindManyCharacterSpellsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * Filter, which CharacterSpells to fetch.
  **/
  where?: CharacterSpellsWhereInput
  /**
   * Determine the order of the CharacterSpells to fetch.
  **/
  orderBy?: Enumerable<CharacterSpellsOrderByInput> | CharacterSpellsOrderByInput
  /**
   * Sets the position for listing CharacterSpells.
  **/
  cursor?: CharacterSpellsWhereUniqueInput
  /**
   * The number of CharacterSpells to fetch. If negative number, it will take CharacterSpells before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` CharacterSpells.
  **/
  skip?: number
  distinct?: Enumerable<CharacterSpellsDistinctFieldEnum>
}


/**
 * CharacterSpells create
 */
export type CharacterSpellsCreateArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * The data needed to create a CharacterSpells.
  **/
  data: CharacterSpellsCreateInput
}


/**
 * CharacterSpells update
 */
export type CharacterSpellsUpdateArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * The data needed to update a CharacterSpells.
  **/
  data: CharacterSpellsUpdateInput
  /**
   * Choose, which CharacterSpells to update.
  **/
  where: CharacterSpellsWhereUniqueInput
}


/**
 * CharacterSpells updateMany
 */
export type CharacterSpellsUpdateManyArgs = {
  data: CharacterSpellsUpdateManyMutationInput
  where?: CharacterSpellsWhereInput
}


/**
 * CharacterSpells upsert
 */
export type CharacterSpellsUpsertArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * The filter to search for the CharacterSpells to update in case it exists.
  **/
  where: CharacterSpellsWhereUniqueInput
  /**
   * In case the CharacterSpells found by the `where` argument doesn't exist, create a new CharacterSpells with this data.
  **/
  create: CharacterSpellsCreateInput
  /**
   * In case the CharacterSpells was found with the provided `where` argument, update it with this data.
  **/
  update: CharacterSpellsUpdateInput
}


/**
 * CharacterSpells delete
 */
export type CharacterSpellsDeleteArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
  /**
   * Filter which CharacterSpells to delete.
  **/
  where: CharacterSpellsWhereUniqueInput
}


/**
 * CharacterSpells deleteMany
 */
export type CharacterSpellsDeleteManyArgs = {
  where?: CharacterSpellsWhereInput
}


/**
 * CharacterSpells without action
 */
export type CharacterSpellsArgs = {
  /**
   * Select specific fields to fetch from the CharacterSpells
  **/
  select?: CharacterSpellsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CharacterSpellsInclude | null
}



/**
 * Model Equipment
 */

export type Equipment = {
  id: number
  name: string | null
  type: string | null
  description: string | null
}


export type AggregateEquipment = {
  count: number
  avg: EquipmentAvgAggregateOutputType | null
  sum: EquipmentSumAggregateOutputType | null
  min: EquipmentMinAggregateOutputType | null
  max: EquipmentMaxAggregateOutputType | null
}

export type EquipmentAvgAggregateOutputType = {
  id: number
}

export type EquipmentSumAggregateOutputType = {
  id: number
}

export type EquipmentMinAggregateOutputType = {
  id: number
}

export type EquipmentMaxAggregateOutputType = {
  id: number
}


export type EquipmentAvgAggregateInputType = {
  id?: true
}

export type EquipmentSumAggregateInputType = {
  id?: true
}

export type EquipmentMinAggregateInputType = {
  id?: true
}

export type EquipmentMaxAggregateInputType = {
  id?: true
}

export type AggregateEquipmentArgs = {
  where?: EquipmentWhereInput
  orderBy?: Enumerable<EquipmentOrderByInput> | EquipmentOrderByInput
  cursor?: EquipmentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EquipmentDistinctFieldEnum>
  count?: true
  avg?: EquipmentAvgAggregateInputType
  sum?: EquipmentSumAggregateInputType
  min?: EquipmentMinAggregateInputType
  max?: EquipmentMaxAggregateInputType
}

export type GetEquipmentAggregateType<T extends AggregateEquipmentArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetEquipmentAggregateScalarType<T[P]>
}

export type GetEquipmentAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof EquipmentAvgAggregateOutputType ? EquipmentAvgAggregateOutputType[P] : never
}
    
    

export type EquipmentSelect = {
  id?: boolean
  name?: boolean
  type?: boolean
  description?: boolean
  CharacterEquipment?: boolean | FindManyCharacterEquipmentArgs
}

export type EquipmentInclude = {
  CharacterEquipment?: boolean | FindManyCharacterEquipmentArgs
}

export type EquipmentGetPayload<
  S extends boolean | null | undefined | EquipmentArgs,
  U = keyof S
> = S extends true
  ? Equipment
  : S extends undefined
  ? never
  : S extends EquipmentArgs | FindManyEquipmentArgs
  ? 'include' extends U
    ? Equipment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'CharacterEquipment'
      ? Array<CharacterEquipmentGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Equipment ? Equipment[P]
: 
      P extends 'CharacterEquipment'
      ? Array<CharacterEquipmentGetPayload<S['select'][P]>> : never
    }
  : Equipment
: Equipment


export interface EquipmentDelegate {
  /**
   * Find zero or one Equipment that matches the filter.
   * @param {FindOneEquipmentArgs} args - Arguments to find a Equipment
   * @example
   * // Get one Equipment
   * const equipment = await prisma.equipment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneEquipmentArgs>(
    args: Subset<T, FindOneEquipmentArgs>
  ): CheckSelect<T, Prisma__EquipmentClient<Equipment | null>, Prisma__EquipmentClient<EquipmentGetPayload<T> | null>>
  /**
   * Find the first Equipment that matches the filter.
   * @param {FindFirstEquipmentArgs} args - Arguments to find a Equipment
   * @example
   * // Get one Equipment
   * const equipment = await prisma.equipment.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstEquipmentArgs>(
    args?: Subset<T, FindFirstEquipmentArgs>
  ): CheckSelect<T, Prisma__EquipmentClient<Equipment | null>, Prisma__EquipmentClient<EquipmentGetPayload<T> | null>>
  /**
   * Find zero or more Equipment that matches the filter.
   * @param {FindManyEquipmentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Equipment
   * const equipment = await prisma.equipment.findMany()
   * 
   * // Get first 10 Equipment
   * const equipment = await prisma.equipment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const equipmentWithIdOnly = await prisma.equipment.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyEquipmentArgs>(
    args?: Subset<T, FindManyEquipmentArgs>
  ): CheckSelect<T, Promise<Array<Equipment>>, Promise<Array<EquipmentGetPayload<T>>>>
  /**
   * Create a Equipment.
   * @param {EquipmentCreateArgs} args - Arguments to create a Equipment.
   * @example
   * // Create one Equipment
   * const Equipment = await prisma.equipment.create({
   *   data: {
   *     // ... data to create a Equipment
   *   }
   * })
   * 
  **/
  create<T extends EquipmentCreateArgs>(
    args: Subset<T, EquipmentCreateArgs>
  ): CheckSelect<T, Prisma__EquipmentClient<Equipment>, Prisma__EquipmentClient<EquipmentGetPayload<T>>>
  /**
   * Delete a Equipment.
   * @param {EquipmentDeleteArgs} args - Arguments to delete one Equipment.
   * @example
   * // Delete one Equipment
   * const Equipment = await prisma.equipment.delete({
   *   where: {
   *     // ... filter to delete one Equipment
   *   }
   * })
   * 
  **/
  delete<T extends EquipmentDeleteArgs>(
    args: Subset<T, EquipmentDeleteArgs>
  ): CheckSelect<T, Prisma__EquipmentClient<Equipment>, Prisma__EquipmentClient<EquipmentGetPayload<T>>>
  /**
   * Update one Equipment.
   * @param {EquipmentUpdateArgs} args - Arguments to update one Equipment.
   * @example
   * // Update one Equipment
   * const equipment = await prisma.equipment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends EquipmentUpdateArgs>(
    args: Subset<T, EquipmentUpdateArgs>
  ): CheckSelect<T, Prisma__EquipmentClient<Equipment>, Prisma__EquipmentClient<EquipmentGetPayload<T>>>
  /**
   * Delete zero or more Equipment.
   * @param {EquipmentDeleteManyArgs} args - Arguments to filter Equipment to delete.
   * @example
   * // Delete a few Equipment
   * const { count } = await prisma.equipment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends EquipmentDeleteManyArgs>(
    args: Subset<T, EquipmentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Equipment.
   * @param {EquipmentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Equipment
   * const equipment = await prisma.equipment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends EquipmentUpdateManyArgs>(
    args: Subset<T, EquipmentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Equipment.
   * @param {EquipmentUpsertArgs} args - Arguments to update or create a Equipment.
   * @example
   * // Update or create a Equipment
   * const equipment = await prisma.equipment.upsert({
   *   create: {
   *     // ... data to create a Equipment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Equipment we want to update
   *   }
   * })
  **/
  upsert<T extends EquipmentUpsertArgs>(
    args: Subset<T, EquipmentUpsertArgs>
  ): CheckSelect<T, Prisma__EquipmentClient<Equipment>, Prisma__EquipmentClient<EquipmentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyEquipmentArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateEquipmentArgs>(args: Subset<T, AggregateEquipmentArgs>): Promise<GetEquipmentAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Equipment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__EquipmentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  CharacterEquipment<T extends FindManyCharacterEquipmentArgs = {}>(args?: Subset<T, FindManyCharacterEquipmentArgs>): CheckSelect<T, Promise<Array<CharacterEquipment>>, Promise<Array<CharacterEquipmentGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Equipment findOne
 */
export type FindOneEquipmentArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * Filter, which Equipment to fetch.
  **/
  where: EquipmentWhereUniqueInput
}


/**
 * Equipment findFirst
 */
export type FindFirstEquipmentArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * Filter, which Equipment to fetch.
  **/
  where?: EquipmentWhereInput
  orderBy?: Enumerable<EquipmentOrderByInput> | EquipmentOrderByInput
  cursor?: EquipmentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EquipmentDistinctFieldEnum>
}


/**
 * Equipment findMany
 */
export type FindManyEquipmentArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * Filter, which Equipment to fetch.
  **/
  where?: EquipmentWhereInput
  /**
   * Determine the order of the Equipment to fetch.
  **/
  orderBy?: Enumerable<EquipmentOrderByInput> | EquipmentOrderByInput
  /**
   * Sets the position for listing Equipment.
  **/
  cursor?: EquipmentWhereUniqueInput
  /**
   * The number of Equipment to fetch. If negative number, it will take Equipment before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Equipment.
  **/
  skip?: number
  distinct?: Enumerable<EquipmentDistinctFieldEnum>
}


/**
 * Equipment create
 */
export type EquipmentCreateArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * The data needed to create a Equipment.
  **/
  data: EquipmentCreateInput
}


/**
 * Equipment update
 */
export type EquipmentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * The data needed to update a Equipment.
  **/
  data: EquipmentUpdateInput
  /**
   * Choose, which Equipment to update.
  **/
  where: EquipmentWhereUniqueInput
}


/**
 * Equipment updateMany
 */
export type EquipmentUpdateManyArgs = {
  data: EquipmentUpdateManyMutationInput
  where?: EquipmentWhereInput
}


/**
 * Equipment upsert
 */
export type EquipmentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * The filter to search for the Equipment to update in case it exists.
  **/
  where: EquipmentWhereUniqueInput
  /**
   * In case the Equipment found by the `where` argument doesn't exist, create a new Equipment with this data.
  **/
  create: EquipmentCreateInput
  /**
   * In case the Equipment was found with the provided `where` argument, update it with this data.
  **/
  update: EquipmentUpdateInput
}


/**
 * Equipment delete
 */
export type EquipmentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
  /**
   * Filter which Equipment to delete.
  **/
  where: EquipmentWhereUniqueInput
}


/**
 * Equipment deleteMany
 */
export type EquipmentDeleteManyArgs = {
  where?: EquipmentWhereInput
}


/**
 * Equipment without action
 */
export type EquipmentArgs = {
  /**
   * Select specific fields to fetch from the Equipment
  **/
  select?: EquipmentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EquipmentInclude | null
}



/**
 * Model DiceModifier
 */

export type DiceModifier = {
  id: number
  name: string | null
  scope: string | null
  diceSides: number | null
  rollType: string | null
}


export type AggregateDiceModifier = {
  count: number
  avg: DiceModifierAvgAggregateOutputType | null
  sum: DiceModifierSumAggregateOutputType | null
  min: DiceModifierMinAggregateOutputType | null
  max: DiceModifierMaxAggregateOutputType | null
}

export type DiceModifierAvgAggregateOutputType = {
  id: number
  diceSides: number | null
}

export type DiceModifierSumAggregateOutputType = {
  id: number
  diceSides: number | null
}

export type DiceModifierMinAggregateOutputType = {
  id: number
  diceSides: number | null
}

export type DiceModifierMaxAggregateOutputType = {
  id: number
  diceSides: number | null
}


export type DiceModifierAvgAggregateInputType = {
  id?: true
  diceSides?: true
}

export type DiceModifierSumAggregateInputType = {
  id?: true
  diceSides?: true
}

export type DiceModifierMinAggregateInputType = {
  id?: true
  diceSides?: true
}

export type DiceModifierMaxAggregateInputType = {
  id?: true
  diceSides?: true
}

export type AggregateDiceModifierArgs = {
  where?: DiceModifierWhereInput
  orderBy?: Enumerable<DiceModifierOrderByInput> | DiceModifierOrderByInput
  cursor?: DiceModifierWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DiceModifierDistinctFieldEnum>
  count?: true
  avg?: DiceModifierAvgAggregateInputType
  sum?: DiceModifierSumAggregateInputType
  min?: DiceModifierMinAggregateInputType
  max?: DiceModifierMaxAggregateInputType
}

export type GetDiceModifierAggregateType<T extends AggregateDiceModifierArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetDiceModifierAggregateScalarType<T[P]>
}

export type GetDiceModifierAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof DiceModifierAvgAggregateOutputType ? DiceModifierAvgAggregateOutputType[P] : never
}
    
    

export type DiceModifierSelect = {
  id?: boolean
  name?: boolean
  scope?: boolean
  diceSides?: boolean
  rollType?: boolean
}

export type DiceModifierGetPayload<
  S extends boolean | null | undefined | DiceModifierArgs,
  U = keyof S
> = S extends true
  ? DiceModifier
  : S extends undefined
  ? never
  : S extends DiceModifierArgs | FindManyDiceModifierArgs
  ? 'include' extends U
    ? DiceModifier 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof DiceModifier ? DiceModifier[P]
: 
 never
    }
  : DiceModifier
: DiceModifier


export interface DiceModifierDelegate {
  /**
   * Find zero or one DiceModifier that matches the filter.
   * @param {FindOneDiceModifierArgs} args - Arguments to find a DiceModifier
   * @example
   * // Get one DiceModifier
   * const diceModifier = await prisma.diceModifier.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneDiceModifierArgs>(
    args: Subset<T, FindOneDiceModifierArgs>
  ): CheckSelect<T, Prisma__DiceModifierClient<DiceModifier | null>, Prisma__DiceModifierClient<DiceModifierGetPayload<T> | null>>
  /**
   * Find the first DiceModifier that matches the filter.
   * @param {FindFirstDiceModifierArgs} args - Arguments to find a DiceModifier
   * @example
   * // Get one DiceModifier
   * const diceModifier = await prisma.diceModifier.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstDiceModifierArgs>(
    args?: Subset<T, FindFirstDiceModifierArgs>
  ): CheckSelect<T, Prisma__DiceModifierClient<DiceModifier | null>, Prisma__DiceModifierClient<DiceModifierGetPayload<T> | null>>
  /**
   * Find zero or more DiceModifiers that matches the filter.
   * @param {FindManyDiceModifierArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all DiceModifiers
   * const diceModifiers = await prisma.diceModifier.findMany()
   * 
   * // Get first 10 DiceModifiers
   * const diceModifiers = await prisma.diceModifier.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const diceModifierWithIdOnly = await prisma.diceModifier.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyDiceModifierArgs>(
    args?: Subset<T, FindManyDiceModifierArgs>
  ): CheckSelect<T, Promise<Array<DiceModifier>>, Promise<Array<DiceModifierGetPayload<T>>>>
  /**
   * Create a DiceModifier.
   * @param {DiceModifierCreateArgs} args - Arguments to create a DiceModifier.
   * @example
   * // Create one DiceModifier
   * const DiceModifier = await prisma.diceModifier.create({
   *   data: {
   *     // ... data to create a DiceModifier
   *   }
   * })
   * 
  **/
  create<T extends DiceModifierCreateArgs>(
    args: Subset<T, DiceModifierCreateArgs>
  ): CheckSelect<T, Prisma__DiceModifierClient<DiceModifier>, Prisma__DiceModifierClient<DiceModifierGetPayload<T>>>
  /**
   * Delete a DiceModifier.
   * @param {DiceModifierDeleteArgs} args - Arguments to delete one DiceModifier.
   * @example
   * // Delete one DiceModifier
   * const DiceModifier = await prisma.diceModifier.delete({
   *   where: {
   *     // ... filter to delete one DiceModifier
   *   }
   * })
   * 
  **/
  delete<T extends DiceModifierDeleteArgs>(
    args: Subset<T, DiceModifierDeleteArgs>
  ): CheckSelect<T, Prisma__DiceModifierClient<DiceModifier>, Prisma__DiceModifierClient<DiceModifierGetPayload<T>>>
  /**
   * Update one DiceModifier.
   * @param {DiceModifierUpdateArgs} args - Arguments to update one DiceModifier.
   * @example
   * // Update one DiceModifier
   * const diceModifier = await prisma.diceModifier.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends DiceModifierUpdateArgs>(
    args: Subset<T, DiceModifierUpdateArgs>
  ): CheckSelect<T, Prisma__DiceModifierClient<DiceModifier>, Prisma__DiceModifierClient<DiceModifierGetPayload<T>>>
  /**
   * Delete zero or more DiceModifiers.
   * @param {DiceModifierDeleteManyArgs} args - Arguments to filter DiceModifiers to delete.
   * @example
   * // Delete a few DiceModifiers
   * const { count } = await prisma.diceModifier.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends DiceModifierDeleteManyArgs>(
    args: Subset<T, DiceModifierDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more DiceModifiers.
   * @param {DiceModifierUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many DiceModifiers
   * const diceModifier = await prisma.diceModifier.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends DiceModifierUpdateManyArgs>(
    args: Subset<T, DiceModifierUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one DiceModifier.
   * @param {DiceModifierUpsertArgs} args - Arguments to update or create a DiceModifier.
   * @example
   * // Update or create a DiceModifier
   * const diceModifier = await prisma.diceModifier.upsert({
   *   create: {
   *     // ... data to create a DiceModifier
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the DiceModifier we want to update
   *   }
   * })
  **/
  upsert<T extends DiceModifierUpsertArgs>(
    args: Subset<T, DiceModifierUpsertArgs>
  ): CheckSelect<T, Prisma__DiceModifierClient<DiceModifier>, Prisma__DiceModifierClient<DiceModifierGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyDiceModifierArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateDiceModifierArgs>(args: Subset<T, AggregateDiceModifierArgs>): Promise<GetDiceModifierAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for DiceModifier.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__DiceModifierClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * DiceModifier findOne
 */
export type FindOneDiceModifierArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * Filter, which DiceModifier to fetch.
  **/
  where: DiceModifierWhereUniqueInput
}


/**
 * DiceModifier findFirst
 */
export type FindFirstDiceModifierArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * Filter, which DiceModifier to fetch.
  **/
  where?: DiceModifierWhereInput
  orderBy?: Enumerable<DiceModifierOrderByInput> | DiceModifierOrderByInput
  cursor?: DiceModifierWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DiceModifierDistinctFieldEnum>
}


/**
 * DiceModifier findMany
 */
export type FindManyDiceModifierArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * Filter, which DiceModifiers to fetch.
  **/
  where?: DiceModifierWhereInput
  /**
   * Determine the order of the DiceModifiers to fetch.
  **/
  orderBy?: Enumerable<DiceModifierOrderByInput> | DiceModifierOrderByInput
  /**
   * Sets the position for listing DiceModifiers.
  **/
  cursor?: DiceModifierWhereUniqueInput
  /**
   * The number of DiceModifiers to fetch. If negative number, it will take DiceModifiers before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` DiceModifiers.
  **/
  skip?: number
  distinct?: Enumerable<DiceModifierDistinctFieldEnum>
}


/**
 * DiceModifier create
 */
export type DiceModifierCreateArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * The data needed to create a DiceModifier.
  **/
  data: DiceModifierCreateInput
}


/**
 * DiceModifier update
 */
export type DiceModifierUpdateArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * The data needed to update a DiceModifier.
  **/
  data: DiceModifierUpdateInput
  /**
   * Choose, which DiceModifier to update.
  **/
  where: DiceModifierWhereUniqueInput
}


/**
 * DiceModifier updateMany
 */
export type DiceModifierUpdateManyArgs = {
  data: DiceModifierUpdateManyMutationInput
  where?: DiceModifierWhereInput
}


/**
 * DiceModifier upsert
 */
export type DiceModifierUpsertArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * The filter to search for the DiceModifier to update in case it exists.
  **/
  where: DiceModifierWhereUniqueInput
  /**
   * In case the DiceModifier found by the `where` argument doesn't exist, create a new DiceModifier with this data.
  **/
  create: DiceModifierCreateInput
  /**
   * In case the DiceModifier was found with the provided `where` argument, update it with this data.
  **/
  update: DiceModifierUpdateInput
}


/**
 * DiceModifier delete
 */
export type DiceModifierDeleteArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
  /**
   * Filter which DiceModifier to delete.
  **/
  where: DiceModifierWhereUniqueInput
}


/**
 * DiceModifier deleteMany
 */
export type DiceModifierDeleteManyArgs = {
  where?: DiceModifierWhereInput
}


/**
 * DiceModifier without action
 */
export type DiceModifierArgs = {
  /**
   * Select specific fields to fetch from the DiceModifier
  **/
  select?: DiceModifierSelect | null
}



/**
 * Model Race
 */

export type Race = {
  id: number
  name: string | null
}


export type AggregateRace = {
  count: number
  avg: RaceAvgAggregateOutputType | null
  sum: RaceSumAggregateOutputType | null
  min: RaceMinAggregateOutputType | null
  max: RaceMaxAggregateOutputType | null
}

export type RaceAvgAggregateOutputType = {
  id: number
}

export type RaceSumAggregateOutputType = {
  id: number
}

export type RaceMinAggregateOutputType = {
  id: number
}

export type RaceMaxAggregateOutputType = {
  id: number
}


export type RaceAvgAggregateInputType = {
  id?: true
}

export type RaceSumAggregateInputType = {
  id?: true
}

export type RaceMinAggregateInputType = {
  id?: true
}

export type RaceMaxAggregateInputType = {
  id?: true
}

export type AggregateRaceArgs = {
  where?: RaceWhereInput
  orderBy?: Enumerable<RaceOrderByInput> | RaceOrderByInput
  cursor?: RaceWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RaceDistinctFieldEnum>
  count?: true
  avg?: RaceAvgAggregateInputType
  sum?: RaceSumAggregateInputType
  min?: RaceMinAggregateInputType
  max?: RaceMaxAggregateInputType
}

export type GetRaceAggregateType<T extends AggregateRaceArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRaceAggregateScalarType<T[P]>
}

export type GetRaceAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RaceAvgAggregateOutputType ? RaceAvgAggregateOutputType[P] : never
}
    
    

export type RaceSelect = {
  id?: boolean
  name?: boolean
  Character?: boolean | FindManyCharacterArgs
}

export type RaceInclude = {
  Character?: boolean | FindManyCharacterArgs
}

export type RaceGetPayload<
  S extends boolean | null | undefined | RaceArgs,
  U = keyof S
> = S extends true
  ? Race
  : S extends undefined
  ? never
  : S extends RaceArgs | FindManyRaceArgs
  ? 'include' extends U
    ? Race  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Character'
      ? Array<CharacterGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Race ? Race[P]
: 
      P extends 'Character'
      ? Array<CharacterGetPayload<S['select'][P]>> : never
    }
  : Race
: Race


export interface RaceDelegate {
  /**
   * Find zero or one Race that matches the filter.
   * @param {FindOneRaceArgs} args - Arguments to find a Race
   * @example
   * // Get one Race
   * const race = await prisma.race.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRaceArgs>(
    args: Subset<T, FindOneRaceArgs>
  ): CheckSelect<T, Prisma__RaceClient<Race | null>, Prisma__RaceClient<RaceGetPayload<T> | null>>
  /**
   * Find the first Race that matches the filter.
   * @param {FindFirstRaceArgs} args - Arguments to find a Race
   * @example
   * // Get one Race
   * const race = await prisma.race.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstRaceArgs>(
    args?: Subset<T, FindFirstRaceArgs>
  ): CheckSelect<T, Prisma__RaceClient<Race | null>, Prisma__RaceClient<RaceGetPayload<T> | null>>
  /**
   * Find zero or more Races that matches the filter.
   * @param {FindManyRaceArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Races
   * const races = await prisma.race.findMany()
   * 
   * // Get first 10 Races
   * const races = await prisma.race.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const raceWithIdOnly = await prisma.race.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRaceArgs>(
    args?: Subset<T, FindManyRaceArgs>
  ): CheckSelect<T, Promise<Array<Race>>, Promise<Array<RaceGetPayload<T>>>>
  /**
   * Create a Race.
   * @param {RaceCreateArgs} args - Arguments to create a Race.
   * @example
   * // Create one Race
   * const Race = await prisma.race.create({
   *   data: {
   *     // ... data to create a Race
   *   }
   * })
   * 
  **/
  create<T extends RaceCreateArgs>(
    args: Subset<T, RaceCreateArgs>
  ): CheckSelect<T, Prisma__RaceClient<Race>, Prisma__RaceClient<RaceGetPayload<T>>>
  /**
   * Delete a Race.
   * @param {RaceDeleteArgs} args - Arguments to delete one Race.
   * @example
   * // Delete one Race
   * const Race = await prisma.race.delete({
   *   where: {
   *     // ... filter to delete one Race
   *   }
   * })
   * 
  **/
  delete<T extends RaceDeleteArgs>(
    args: Subset<T, RaceDeleteArgs>
  ): CheckSelect<T, Prisma__RaceClient<Race>, Prisma__RaceClient<RaceGetPayload<T>>>
  /**
   * Update one Race.
   * @param {RaceUpdateArgs} args - Arguments to update one Race.
   * @example
   * // Update one Race
   * const race = await prisma.race.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RaceUpdateArgs>(
    args: Subset<T, RaceUpdateArgs>
  ): CheckSelect<T, Prisma__RaceClient<Race>, Prisma__RaceClient<RaceGetPayload<T>>>
  /**
   * Delete zero or more Races.
   * @param {RaceDeleteManyArgs} args - Arguments to filter Races to delete.
   * @example
   * // Delete a few Races
   * const { count } = await prisma.race.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RaceDeleteManyArgs>(
    args: Subset<T, RaceDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Races.
   * @param {RaceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Races
   * const race = await prisma.race.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RaceUpdateManyArgs>(
    args: Subset<T, RaceUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Race.
   * @param {RaceUpsertArgs} args - Arguments to update or create a Race.
   * @example
   * // Update or create a Race
   * const race = await prisma.race.upsert({
   *   create: {
   *     // ... data to create a Race
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Race we want to update
   *   }
   * })
  **/
  upsert<T extends RaceUpsertArgs>(
    args: Subset<T, RaceUpsertArgs>
  ): CheckSelect<T, Prisma__RaceClient<Race>, Prisma__RaceClient<RaceGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyRaceArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRaceArgs>(args: Subset<T, AggregateRaceArgs>): Promise<GetRaceAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Race.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__RaceClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Character<T extends FindManyCharacterArgs = {}>(args?: Subset<T, FindManyCharacterArgs>): CheckSelect<T, Promise<Array<Character>>, Promise<Array<CharacterGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Race findOne
 */
export type FindOneRaceArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * Filter, which Race to fetch.
  **/
  where: RaceWhereUniqueInput
}


/**
 * Race findFirst
 */
export type FindFirstRaceArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * Filter, which Race to fetch.
  **/
  where?: RaceWhereInput
  orderBy?: Enumerable<RaceOrderByInput> | RaceOrderByInput
  cursor?: RaceWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RaceDistinctFieldEnum>
}


/**
 * Race findMany
 */
export type FindManyRaceArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * Filter, which Races to fetch.
  **/
  where?: RaceWhereInput
  /**
   * Determine the order of the Races to fetch.
  **/
  orderBy?: Enumerable<RaceOrderByInput> | RaceOrderByInput
  /**
   * Sets the position for listing Races.
  **/
  cursor?: RaceWhereUniqueInput
  /**
   * The number of Races to fetch. If negative number, it will take Races before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Races.
  **/
  skip?: number
  distinct?: Enumerable<RaceDistinctFieldEnum>
}


/**
 * Race create
 */
export type RaceCreateArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * The data needed to create a Race.
  **/
  data: RaceCreateInput
}


/**
 * Race update
 */
export type RaceUpdateArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * The data needed to update a Race.
  **/
  data: RaceUpdateInput
  /**
   * Choose, which Race to update.
  **/
  where: RaceWhereUniqueInput
}


/**
 * Race updateMany
 */
export type RaceUpdateManyArgs = {
  data: RaceUpdateManyMutationInput
  where?: RaceWhereInput
}


/**
 * Race upsert
 */
export type RaceUpsertArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * The filter to search for the Race to update in case it exists.
  **/
  where: RaceWhereUniqueInput
  /**
   * In case the Race found by the `where` argument doesn't exist, create a new Race with this data.
  **/
  create: RaceCreateInput
  /**
   * In case the Race was found with the provided `where` argument, update it with this data.
  **/
  update: RaceUpdateInput
}


/**
 * Race delete
 */
export type RaceDeleteArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
  /**
   * Filter which Race to delete.
  **/
  where: RaceWhereUniqueInput
}


/**
 * Race deleteMany
 */
export type RaceDeleteManyArgs = {
  where?: RaceWhereInput
}


/**
 * Race without action
 */
export type RaceArgs = {
  /**
   * Select specific fields to fetch from the Race
  **/
  select?: RaceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: RaceInclude | null
}



/**
 * Model Class
 */

export type Class = {
  id: number
  name: string | null
  hitdice: string | null
  hpfirstlevel: number | null
  hpperlevel: number | null
  hpperlevel_roll: number | null
}


export type AggregateClass = {
  count: number
  avg: ClassAvgAggregateOutputType | null
  sum: ClassSumAggregateOutputType | null
  min: ClassMinAggregateOutputType | null
  max: ClassMaxAggregateOutputType | null
}

export type ClassAvgAggregateOutputType = {
  id: number
  hpfirstlevel: number | null
  hpperlevel: number | null
  hpperlevel_roll: number | null
}

export type ClassSumAggregateOutputType = {
  id: number
  hpfirstlevel: number | null
  hpperlevel: number | null
  hpperlevel_roll: number | null
}

export type ClassMinAggregateOutputType = {
  id: number
  hpfirstlevel: number | null
  hpperlevel: number | null
  hpperlevel_roll: number | null
}

export type ClassMaxAggregateOutputType = {
  id: number
  hpfirstlevel: number | null
  hpperlevel: number | null
  hpperlevel_roll: number | null
}


export type ClassAvgAggregateInputType = {
  id?: true
  hpfirstlevel?: true
  hpperlevel?: true
  hpperlevel_roll?: true
}

export type ClassSumAggregateInputType = {
  id?: true
  hpfirstlevel?: true
  hpperlevel?: true
  hpperlevel_roll?: true
}

export type ClassMinAggregateInputType = {
  id?: true
  hpfirstlevel?: true
  hpperlevel?: true
  hpperlevel_roll?: true
}

export type ClassMaxAggregateInputType = {
  id?: true
  hpfirstlevel?: true
  hpperlevel?: true
  hpperlevel_roll?: true
}

export type AggregateClassArgs = {
  where?: ClassWhereInput
  orderBy?: Enumerable<ClassOrderByInput> | ClassOrderByInput
  cursor?: ClassWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ClassDistinctFieldEnum>
  count?: true
  avg?: ClassAvgAggregateInputType
  sum?: ClassSumAggregateInputType
  min?: ClassMinAggregateInputType
  max?: ClassMaxAggregateInputType
}

export type GetClassAggregateType<T extends AggregateClassArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetClassAggregateScalarType<T[P]>
}

export type GetClassAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ClassAvgAggregateOutputType ? ClassAvgAggregateOutputType[P] : never
}
    
    

export type ClassSelect = {
  id?: boolean
  name?: boolean
  hitdice?: boolean
  hpfirstlevel?: boolean
  hpperlevel?: boolean
  hpperlevel_roll?: boolean
  proficiencies?: boolean | FindManyProficiencyArgs
  traits?: boolean | FindManyTraitArgs
  Character?: boolean | FindManyCharacterArgs
}

export type ClassInclude = {
  proficiencies?: boolean | FindManyProficiencyArgs
  traits?: boolean | FindManyTraitArgs
  Character?: boolean | FindManyCharacterArgs
}

export type ClassGetPayload<
  S extends boolean | null | undefined | ClassArgs,
  U = keyof S
> = S extends true
  ? Class
  : S extends undefined
  ? never
  : S extends ClassArgs | FindManyClassArgs
  ? 'include' extends U
    ? Class  & {
      [P in TrueKeys<S['include']>]:
      P extends 'proficiencies'
      ? Array<ProficiencyGetPayload<S['include'][P]>> :
      P extends 'traits'
      ? Array<TraitGetPayload<S['include'][P]>> :
      P extends 'Character'
      ? Array<CharacterGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Class ? Class[P]
: 
      P extends 'proficiencies'
      ? Array<ProficiencyGetPayload<S['select'][P]>> :
      P extends 'traits'
      ? Array<TraitGetPayload<S['select'][P]>> :
      P extends 'Character'
      ? Array<CharacterGetPayload<S['select'][P]>> : never
    }
  : Class
: Class


export interface ClassDelegate {
  /**
   * Find zero or one Class that matches the filter.
   * @param {FindOneClassArgs} args - Arguments to find a Class
   * @example
   * // Get one Class
   * const class = await prisma.class.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneClassArgs>(
    args: Subset<T, FindOneClassArgs>
  ): CheckSelect<T, Prisma__ClassClient<Class | null>, Prisma__ClassClient<ClassGetPayload<T> | null>>
  /**
   * Find the first Class that matches the filter.
   * @param {FindFirstClassArgs} args - Arguments to find a Class
   * @example
   * // Get one Class
   * const class = await prisma.class.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstClassArgs>(
    args?: Subset<T, FindFirstClassArgs>
  ): CheckSelect<T, Prisma__ClassClient<Class | null>, Prisma__ClassClient<ClassGetPayload<T> | null>>
  /**
   * Find zero or more Classes that matches the filter.
   * @param {FindManyClassArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Classes
   * const classes = await prisma.class.findMany()
   * 
   * // Get first 10 Classes
   * const classes = await prisma.class.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyClassArgs>(
    args?: Subset<T, FindManyClassArgs>
  ): CheckSelect<T, Promise<Array<Class>>, Promise<Array<ClassGetPayload<T>>>>
  /**
   * Create a Class.
   * @param {ClassCreateArgs} args - Arguments to create a Class.
   * @example
   * // Create one Class
   * const Class = await prisma.class.create({
   *   data: {
   *     // ... data to create a Class
   *   }
   * })
   * 
  **/
  create<T extends ClassCreateArgs>(
    args: Subset<T, ClassCreateArgs>
  ): CheckSelect<T, Prisma__ClassClient<Class>, Prisma__ClassClient<ClassGetPayload<T>>>
  /**
   * Delete a Class.
   * @param {ClassDeleteArgs} args - Arguments to delete one Class.
   * @example
   * // Delete one Class
   * const Class = await prisma.class.delete({
   *   where: {
   *     // ... filter to delete one Class
   *   }
   * })
   * 
  **/
  delete<T extends ClassDeleteArgs>(
    args: Subset<T, ClassDeleteArgs>
  ): CheckSelect<T, Prisma__ClassClient<Class>, Prisma__ClassClient<ClassGetPayload<T>>>
  /**
   * Update one Class.
   * @param {ClassUpdateArgs} args - Arguments to update one Class.
   * @example
   * // Update one Class
   * const class = await prisma.class.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ClassUpdateArgs>(
    args: Subset<T, ClassUpdateArgs>
  ): CheckSelect<T, Prisma__ClassClient<Class>, Prisma__ClassClient<ClassGetPayload<T>>>
  /**
   * Delete zero or more Classes.
   * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
   * @example
   * // Delete a few Classes
   * const { count } = await prisma.class.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ClassDeleteManyArgs>(
    args: Subset<T, ClassDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Classes.
   * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Classes
   * const class = await prisma.class.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ClassUpdateManyArgs>(
    args: Subset<T, ClassUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Class.
   * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
   * @example
   * // Update or create a Class
   * const class = await prisma.class.upsert({
   *   create: {
   *     // ... data to create a Class
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Class we want to update
   *   }
   * })
  **/
  upsert<T extends ClassUpsertArgs>(
    args: Subset<T, ClassUpsertArgs>
  ): CheckSelect<T, Prisma__ClassClient<Class>, Prisma__ClassClient<ClassGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyClassArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateClassArgs>(args: Subset<T, AggregateClassArgs>): Promise<GetClassAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Class.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ClassClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  proficiencies<T extends FindManyProficiencyArgs = {}>(args?: Subset<T, FindManyProficiencyArgs>): CheckSelect<T, Promise<Array<Proficiency>>, Promise<Array<ProficiencyGetPayload<T>>>>;

  traits<T extends FindManyTraitArgs = {}>(args?: Subset<T, FindManyTraitArgs>): CheckSelect<T, Promise<Array<Trait>>, Promise<Array<TraitGetPayload<T>>>>;

  Character<T extends FindManyCharacterArgs = {}>(args?: Subset<T, FindManyCharacterArgs>): CheckSelect<T, Promise<Array<Character>>, Promise<Array<CharacterGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Class findOne
 */
export type FindOneClassArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * Filter, which Class to fetch.
  **/
  where: ClassWhereUniqueInput
}


/**
 * Class findFirst
 */
export type FindFirstClassArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * Filter, which Class to fetch.
  **/
  where?: ClassWhereInput
  orderBy?: Enumerable<ClassOrderByInput> | ClassOrderByInput
  cursor?: ClassWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ClassDistinctFieldEnum>
}


/**
 * Class findMany
 */
export type FindManyClassArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * Filter, which Classes to fetch.
  **/
  where?: ClassWhereInput
  /**
   * Determine the order of the Classes to fetch.
  **/
  orderBy?: Enumerable<ClassOrderByInput> | ClassOrderByInput
  /**
   * Sets the position for listing Classes.
  **/
  cursor?: ClassWhereUniqueInput
  /**
   * The number of Classes to fetch. If negative number, it will take Classes before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Classes.
  **/
  skip?: number
  distinct?: Enumerable<ClassDistinctFieldEnum>
}


/**
 * Class create
 */
export type ClassCreateArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * The data needed to create a Class.
  **/
  data: ClassCreateInput
}


/**
 * Class update
 */
export type ClassUpdateArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * The data needed to update a Class.
  **/
  data: ClassUpdateInput
  /**
   * Choose, which Class to update.
  **/
  where: ClassWhereUniqueInput
}


/**
 * Class updateMany
 */
export type ClassUpdateManyArgs = {
  data: ClassUpdateManyMutationInput
  where?: ClassWhereInput
}


/**
 * Class upsert
 */
export type ClassUpsertArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * The filter to search for the Class to update in case it exists.
  **/
  where: ClassWhereUniqueInput
  /**
   * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
  **/
  create: ClassCreateInput
  /**
   * In case the Class was found with the provided `where` argument, update it with this data.
  **/
  update: ClassUpdateInput
}


/**
 * Class delete
 */
export type ClassDeleteArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
  /**
   * Filter which Class to delete.
  **/
  where: ClassWhereUniqueInput
}


/**
 * Class deleteMany
 */
export type ClassDeleteManyArgs = {
  where?: ClassWhereInput
}


/**
 * Class without action
 */
export type ClassArgs = {
  /**
   * Select specific fields to fetch from the Class
  **/
  select?: ClassSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ClassInclude | null
}



/**
 * Model Skill
 */

export type Skill = {
  id: number
  name: string | null
}


export type AggregateSkill = {
  count: number
  avg: SkillAvgAggregateOutputType | null
  sum: SkillSumAggregateOutputType | null
  min: SkillMinAggregateOutputType | null
  max: SkillMaxAggregateOutputType | null
}

export type SkillAvgAggregateOutputType = {
  id: number
}

export type SkillSumAggregateOutputType = {
  id: number
}

export type SkillMinAggregateOutputType = {
  id: number
}

export type SkillMaxAggregateOutputType = {
  id: number
}


export type SkillAvgAggregateInputType = {
  id?: true
}

export type SkillSumAggregateInputType = {
  id?: true
}

export type SkillMinAggregateInputType = {
  id?: true
}

export type SkillMaxAggregateInputType = {
  id?: true
}

export type AggregateSkillArgs = {
  where?: SkillWhereInput
  orderBy?: Enumerable<SkillOrderByInput> | SkillOrderByInput
  cursor?: SkillWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SkillDistinctFieldEnum>
  count?: true
  avg?: SkillAvgAggregateInputType
  sum?: SkillSumAggregateInputType
  min?: SkillMinAggregateInputType
  max?: SkillMaxAggregateInputType
}

export type GetSkillAggregateType<T extends AggregateSkillArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSkillAggregateScalarType<T[P]>
}

export type GetSkillAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SkillAvgAggregateOutputType ? SkillAvgAggregateOutputType[P] : never
}
    
    

export type SkillSelect = {
  id?: boolean
  name?: boolean
  CharacterSkills?: boolean | FindManyCharacterSkillsArgs
}

export type SkillInclude = {
  CharacterSkills?: boolean | FindManyCharacterSkillsArgs
}

export type SkillGetPayload<
  S extends boolean | null | undefined | SkillArgs,
  U = keyof S
> = S extends true
  ? Skill
  : S extends undefined
  ? never
  : S extends SkillArgs | FindManySkillArgs
  ? 'include' extends U
    ? Skill  & {
      [P in TrueKeys<S['include']>]:
      P extends 'CharacterSkills'
      ? Array<CharacterSkillsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Skill ? Skill[P]
: 
      P extends 'CharacterSkills'
      ? Array<CharacterSkillsGetPayload<S['select'][P]>> : never
    }
  : Skill
: Skill


export interface SkillDelegate {
  /**
   * Find zero or one Skill that matches the filter.
   * @param {FindOneSkillArgs} args - Arguments to find a Skill
   * @example
   * // Get one Skill
   * const skill = await prisma.skill.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSkillArgs>(
    args: Subset<T, FindOneSkillArgs>
  ): CheckSelect<T, Prisma__SkillClient<Skill | null>, Prisma__SkillClient<SkillGetPayload<T> | null>>
  /**
   * Find the first Skill that matches the filter.
   * @param {FindFirstSkillArgs} args - Arguments to find a Skill
   * @example
   * // Get one Skill
   * const skill = await prisma.skill.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSkillArgs>(
    args?: Subset<T, FindFirstSkillArgs>
  ): CheckSelect<T, Prisma__SkillClient<Skill | null>, Prisma__SkillClient<SkillGetPayload<T> | null>>
  /**
   * Find zero or more Skills that matches the filter.
   * @param {FindManySkillArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Skills
   * const skills = await prisma.skill.findMany()
   * 
   * // Get first 10 Skills
   * const skills = await prisma.skill.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySkillArgs>(
    args?: Subset<T, FindManySkillArgs>
  ): CheckSelect<T, Promise<Array<Skill>>, Promise<Array<SkillGetPayload<T>>>>
  /**
   * Create a Skill.
   * @param {SkillCreateArgs} args - Arguments to create a Skill.
   * @example
   * // Create one Skill
   * const Skill = await prisma.skill.create({
   *   data: {
   *     // ... data to create a Skill
   *   }
   * })
   * 
  **/
  create<T extends SkillCreateArgs>(
    args: Subset<T, SkillCreateArgs>
  ): CheckSelect<T, Prisma__SkillClient<Skill>, Prisma__SkillClient<SkillGetPayload<T>>>
  /**
   * Delete a Skill.
   * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
   * @example
   * // Delete one Skill
   * const Skill = await prisma.skill.delete({
   *   where: {
   *     // ... filter to delete one Skill
   *   }
   * })
   * 
  **/
  delete<T extends SkillDeleteArgs>(
    args: Subset<T, SkillDeleteArgs>
  ): CheckSelect<T, Prisma__SkillClient<Skill>, Prisma__SkillClient<SkillGetPayload<T>>>
  /**
   * Update one Skill.
   * @param {SkillUpdateArgs} args - Arguments to update one Skill.
   * @example
   * // Update one Skill
   * const skill = await prisma.skill.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SkillUpdateArgs>(
    args: Subset<T, SkillUpdateArgs>
  ): CheckSelect<T, Prisma__SkillClient<Skill>, Prisma__SkillClient<SkillGetPayload<T>>>
  /**
   * Delete zero or more Skills.
   * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
   * @example
   * // Delete a few Skills
   * const { count } = await prisma.skill.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SkillDeleteManyArgs>(
    args: Subset<T, SkillDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Skills.
   * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Skills
   * const skill = await prisma.skill.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SkillUpdateManyArgs>(
    args: Subset<T, SkillUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Skill.
   * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
   * @example
   * // Update or create a Skill
   * const skill = await prisma.skill.upsert({
   *   create: {
   *     // ... data to create a Skill
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Skill we want to update
   *   }
   * })
  **/
  upsert<T extends SkillUpsertArgs>(
    args: Subset<T, SkillUpsertArgs>
  ): CheckSelect<T, Prisma__SkillClient<Skill>, Prisma__SkillClient<SkillGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySkillArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSkillArgs>(args: Subset<T, AggregateSkillArgs>): Promise<GetSkillAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Skill.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SkillClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  CharacterSkills<T extends FindManyCharacterSkillsArgs = {}>(args?: Subset<T, FindManyCharacterSkillsArgs>): CheckSelect<T, Promise<Array<CharacterSkills>>, Promise<Array<CharacterSkillsGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Skill findOne
 */
export type FindOneSkillArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * Filter, which Skill to fetch.
  **/
  where: SkillWhereUniqueInput
}


/**
 * Skill findFirst
 */
export type FindFirstSkillArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * Filter, which Skill to fetch.
  **/
  where?: SkillWhereInput
  orderBy?: Enumerable<SkillOrderByInput> | SkillOrderByInput
  cursor?: SkillWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SkillDistinctFieldEnum>
}


/**
 * Skill findMany
 */
export type FindManySkillArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * Filter, which Skills to fetch.
  **/
  where?: SkillWhereInput
  /**
   * Determine the order of the Skills to fetch.
  **/
  orderBy?: Enumerable<SkillOrderByInput> | SkillOrderByInput
  /**
   * Sets the position for listing Skills.
  **/
  cursor?: SkillWhereUniqueInput
  /**
   * The number of Skills to fetch. If negative number, it will take Skills before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Skills.
  **/
  skip?: number
  distinct?: Enumerable<SkillDistinctFieldEnum>
}


/**
 * Skill create
 */
export type SkillCreateArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * The data needed to create a Skill.
  **/
  data: SkillCreateInput
}


/**
 * Skill update
 */
export type SkillUpdateArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * The data needed to update a Skill.
  **/
  data: SkillUpdateInput
  /**
   * Choose, which Skill to update.
  **/
  where: SkillWhereUniqueInput
}


/**
 * Skill updateMany
 */
export type SkillUpdateManyArgs = {
  data: SkillUpdateManyMutationInput
  where?: SkillWhereInput
}


/**
 * Skill upsert
 */
export type SkillUpsertArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * The filter to search for the Skill to update in case it exists.
  **/
  where: SkillWhereUniqueInput
  /**
   * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
  **/
  create: SkillCreateInput
  /**
   * In case the Skill was found with the provided `where` argument, update it with this data.
  **/
  update: SkillUpdateInput
}


/**
 * Skill delete
 */
export type SkillDeleteArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
  /**
   * Filter which Skill to delete.
  **/
  where: SkillWhereUniqueInput
}


/**
 * Skill deleteMany
 */
export type SkillDeleteManyArgs = {
  where?: SkillWhereInput
}


/**
 * Skill without action
 */
export type SkillArgs = {
  /**
   * Select specific fields to fetch from the Skill
  **/
  select?: SkillSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SkillInclude | null
}



/**
 * Model Spell
 */

export type Spell = {
  id: number
  name: string | null
}


export type AggregateSpell = {
  count: number
  avg: SpellAvgAggregateOutputType | null
  sum: SpellSumAggregateOutputType | null
  min: SpellMinAggregateOutputType | null
  max: SpellMaxAggregateOutputType | null
}

export type SpellAvgAggregateOutputType = {
  id: number
}

export type SpellSumAggregateOutputType = {
  id: number
}

export type SpellMinAggregateOutputType = {
  id: number
}

export type SpellMaxAggregateOutputType = {
  id: number
}


export type SpellAvgAggregateInputType = {
  id?: true
}

export type SpellSumAggregateInputType = {
  id?: true
}

export type SpellMinAggregateInputType = {
  id?: true
}

export type SpellMaxAggregateInputType = {
  id?: true
}

export type AggregateSpellArgs = {
  where?: SpellWhereInput
  orderBy?: Enumerable<SpellOrderByInput> | SpellOrderByInput
  cursor?: SpellWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SpellDistinctFieldEnum>
  count?: true
  avg?: SpellAvgAggregateInputType
  sum?: SpellSumAggregateInputType
  min?: SpellMinAggregateInputType
  max?: SpellMaxAggregateInputType
}

export type GetSpellAggregateType<T extends AggregateSpellArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSpellAggregateScalarType<T[P]>
}

export type GetSpellAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SpellAvgAggregateOutputType ? SpellAvgAggregateOutputType[P] : never
}
    
    

export type SpellSelect = {
  id?: boolean
  name?: boolean
  CharacterSpells?: boolean | FindManyCharacterSpellsArgs
}

export type SpellInclude = {
  CharacterSpells?: boolean | FindManyCharacterSpellsArgs
}

export type SpellGetPayload<
  S extends boolean | null | undefined | SpellArgs,
  U = keyof S
> = S extends true
  ? Spell
  : S extends undefined
  ? never
  : S extends SpellArgs | FindManySpellArgs
  ? 'include' extends U
    ? Spell  & {
      [P in TrueKeys<S['include']>]:
      P extends 'CharacterSpells'
      ? Array<CharacterSpellsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Spell ? Spell[P]
: 
      P extends 'CharacterSpells'
      ? Array<CharacterSpellsGetPayload<S['select'][P]>> : never
    }
  : Spell
: Spell


export interface SpellDelegate {
  /**
   * Find zero or one Spell that matches the filter.
   * @param {FindOneSpellArgs} args - Arguments to find a Spell
   * @example
   * // Get one Spell
   * const spell = await prisma.spell.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSpellArgs>(
    args: Subset<T, FindOneSpellArgs>
  ): CheckSelect<T, Prisma__SpellClient<Spell | null>, Prisma__SpellClient<SpellGetPayload<T> | null>>
  /**
   * Find the first Spell that matches the filter.
   * @param {FindFirstSpellArgs} args - Arguments to find a Spell
   * @example
   * // Get one Spell
   * const spell = await prisma.spell.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSpellArgs>(
    args?: Subset<T, FindFirstSpellArgs>
  ): CheckSelect<T, Prisma__SpellClient<Spell | null>, Prisma__SpellClient<SpellGetPayload<T> | null>>
  /**
   * Find zero or more Spells that matches the filter.
   * @param {FindManySpellArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Spells
   * const spells = await prisma.spell.findMany()
   * 
   * // Get first 10 Spells
   * const spells = await prisma.spell.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const spellWithIdOnly = await prisma.spell.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySpellArgs>(
    args?: Subset<T, FindManySpellArgs>
  ): CheckSelect<T, Promise<Array<Spell>>, Promise<Array<SpellGetPayload<T>>>>
  /**
   * Create a Spell.
   * @param {SpellCreateArgs} args - Arguments to create a Spell.
   * @example
   * // Create one Spell
   * const Spell = await prisma.spell.create({
   *   data: {
   *     // ... data to create a Spell
   *   }
   * })
   * 
  **/
  create<T extends SpellCreateArgs>(
    args: Subset<T, SpellCreateArgs>
  ): CheckSelect<T, Prisma__SpellClient<Spell>, Prisma__SpellClient<SpellGetPayload<T>>>
  /**
   * Delete a Spell.
   * @param {SpellDeleteArgs} args - Arguments to delete one Spell.
   * @example
   * // Delete one Spell
   * const Spell = await prisma.spell.delete({
   *   where: {
   *     // ... filter to delete one Spell
   *   }
   * })
   * 
  **/
  delete<T extends SpellDeleteArgs>(
    args: Subset<T, SpellDeleteArgs>
  ): CheckSelect<T, Prisma__SpellClient<Spell>, Prisma__SpellClient<SpellGetPayload<T>>>
  /**
   * Update one Spell.
   * @param {SpellUpdateArgs} args - Arguments to update one Spell.
   * @example
   * // Update one Spell
   * const spell = await prisma.spell.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SpellUpdateArgs>(
    args: Subset<T, SpellUpdateArgs>
  ): CheckSelect<T, Prisma__SpellClient<Spell>, Prisma__SpellClient<SpellGetPayload<T>>>
  /**
   * Delete zero or more Spells.
   * @param {SpellDeleteManyArgs} args - Arguments to filter Spells to delete.
   * @example
   * // Delete a few Spells
   * const { count } = await prisma.spell.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SpellDeleteManyArgs>(
    args: Subset<T, SpellDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Spells.
   * @param {SpellUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Spells
   * const spell = await prisma.spell.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SpellUpdateManyArgs>(
    args: Subset<T, SpellUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Spell.
   * @param {SpellUpsertArgs} args - Arguments to update or create a Spell.
   * @example
   * // Update or create a Spell
   * const spell = await prisma.spell.upsert({
   *   create: {
   *     // ... data to create a Spell
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Spell we want to update
   *   }
   * })
  **/
  upsert<T extends SpellUpsertArgs>(
    args: Subset<T, SpellUpsertArgs>
  ): CheckSelect<T, Prisma__SpellClient<Spell>, Prisma__SpellClient<SpellGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySpellArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSpellArgs>(args: Subset<T, AggregateSpellArgs>): Promise<GetSpellAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Spell.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SpellClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  CharacterSpells<T extends FindManyCharacterSpellsArgs = {}>(args?: Subset<T, FindManyCharacterSpellsArgs>): CheckSelect<T, Promise<Array<CharacterSpells>>, Promise<Array<CharacterSpellsGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Spell findOne
 */
export type FindOneSpellArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * Filter, which Spell to fetch.
  **/
  where: SpellWhereUniqueInput
}


/**
 * Spell findFirst
 */
export type FindFirstSpellArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * Filter, which Spell to fetch.
  **/
  where?: SpellWhereInput
  orderBy?: Enumerable<SpellOrderByInput> | SpellOrderByInput
  cursor?: SpellWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SpellDistinctFieldEnum>
}


/**
 * Spell findMany
 */
export type FindManySpellArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * Filter, which Spells to fetch.
  **/
  where?: SpellWhereInput
  /**
   * Determine the order of the Spells to fetch.
  **/
  orderBy?: Enumerable<SpellOrderByInput> | SpellOrderByInput
  /**
   * Sets the position for listing Spells.
  **/
  cursor?: SpellWhereUniqueInput
  /**
   * The number of Spells to fetch. If negative number, it will take Spells before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Spells.
  **/
  skip?: number
  distinct?: Enumerable<SpellDistinctFieldEnum>
}


/**
 * Spell create
 */
export type SpellCreateArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * The data needed to create a Spell.
  **/
  data: SpellCreateInput
}


/**
 * Spell update
 */
export type SpellUpdateArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * The data needed to update a Spell.
  **/
  data: SpellUpdateInput
  /**
   * Choose, which Spell to update.
  **/
  where: SpellWhereUniqueInput
}


/**
 * Spell updateMany
 */
export type SpellUpdateManyArgs = {
  data: SpellUpdateManyMutationInput
  where?: SpellWhereInput
}


/**
 * Spell upsert
 */
export type SpellUpsertArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * The filter to search for the Spell to update in case it exists.
  **/
  where: SpellWhereUniqueInput
  /**
   * In case the Spell found by the `where` argument doesn't exist, create a new Spell with this data.
  **/
  create: SpellCreateInput
  /**
   * In case the Spell was found with the provided `where` argument, update it with this data.
  **/
  update: SpellUpdateInput
}


/**
 * Spell delete
 */
export type SpellDeleteArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
  /**
   * Filter which Spell to delete.
  **/
  where: SpellWhereUniqueInput
}


/**
 * Spell deleteMany
 */
export type SpellDeleteManyArgs = {
  where?: SpellWhereInput
}


/**
 * Spell without action
 */
export type SpellArgs = {
  /**
   * Select specific fields to fetch from the Spell
  **/
  select?: SpellSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SpellInclude | null
}



/**
 * Model SubClass
 */

export type SubClass = {
  id: number
  name: string | null
}


export type AggregateSubClass = {
  count: number
  avg: SubClassAvgAggregateOutputType | null
  sum: SubClassSumAggregateOutputType | null
  min: SubClassMinAggregateOutputType | null
  max: SubClassMaxAggregateOutputType | null
}

export type SubClassAvgAggregateOutputType = {
  id: number
}

export type SubClassSumAggregateOutputType = {
  id: number
}

export type SubClassMinAggregateOutputType = {
  id: number
}

export type SubClassMaxAggregateOutputType = {
  id: number
}


export type SubClassAvgAggregateInputType = {
  id?: true
}

export type SubClassSumAggregateInputType = {
  id?: true
}

export type SubClassMinAggregateInputType = {
  id?: true
}

export type SubClassMaxAggregateInputType = {
  id?: true
}

export type AggregateSubClassArgs = {
  where?: SubClassWhereInput
  orderBy?: Enumerable<SubClassOrderByInput> | SubClassOrderByInput
  cursor?: SubClassWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SubClassDistinctFieldEnum>
  count?: true
  avg?: SubClassAvgAggregateInputType
  sum?: SubClassSumAggregateInputType
  min?: SubClassMinAggregateInputType
  max?: SubClassMaxAggregateInputType
}

export type GetSubClassAggregateType<T extends AggregateSubClassArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSubClassAggregateScalarType<T[P]>
}

export type GetSubClassAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SubClassAvgAggregateOutputType ? SubClassAvgAggregateOutputType[P] : never
}
    
    

export type SubClassSelect = {
  id?: boolean
  name?: boolean
}

export type SubClassGetPayload<
  S extends boolean | null | undefined | SubClassArgs,
  U = keyof S
> = S extends true
  ? SubClass
  : S extends undefined
  ? never
  : S extends SubClassArgs | FindManySubClassArgs
  ? 'include' extends U
    ? SubClass 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof SubClass ? SubClass[P]
: 
 never
    }
  : SubClass
: SubClass


export interface SubClassDelegate {
  /**
   * Find zero or one SubClass that matches the filter.
   * @param {FindOneSubClassArgs} args - Arguments to find a SubClass
   * @example
   * // Get one SubClass
   * const subClass = await prisma.subClass.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSubClassArgs>(
    args: Subset<T, FindOneSubClassArgs>
  ): CheckSelect<T, Prisma__SubClassClient<SubClass | null>, Prisma__SubClassClient<SubClassGetPayload<T> | null>>
  /**
   * Find the first SubClass that matches the filter.
   * @param {FindFirstSubClassArgs} args - Arguments to find a SubClass
   * @example
   * // Get one SubClass
   * const subClass = await prisma.subClass.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSubClassArgs>(
    args?: Subset<T, FindFirstSubClassArgs>
  ): CheckSelect<T, Prisma__SubClassClient<SubClass | null>, Prisma__SubClassClient<SubClassGetPayload<T> | null>>
  /**
   * Find zero or more SubClasses that matches the filter.
   * @param {FindManySubClassArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all SubClasses
   * const subClasses = await prisma.subClass.findMany()
   * 
   * // Get first 10 SubClasses
   * const subClasses = await prisma.subClass.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const subClassWithIdOnly = await prisma.subClass.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySubClassArgs>(
    args?: Subset<T, FindManySubClassArgs>
  ): CheckSelect<T, Promise<Array<SubClass>>, Promise<Array<SubClassGetPayload<T>>>>
  /**
   * Create a SubClass.
   * @param {SubClassCreateArgs} args - Arguments to create a SubClass.
   * @example
   * // Create one SubClass
   * const SubClass = await prisma.subClass.create({
   *   data: {
   *     // ... data to create a SubClass
   *   }
   * })
   * 
  **/
  create<T extends SubClassCreateArgs>(
    args: Subset<T, SubClassCreateArgs>
  ): CheckSelect<T, Prisma__SubClassClient<SubClass>, Prisma__SubClassClient<SubClassGetPayload<T>>>
  /**
   * Delete a SubClass.
   * @param {SubClassDeleteArgs} args - Arguments to delete one SubClass.
   * @example
   * // Delete one SubClass
   * const SubClass = await prisma.subClass.delete({
   *   where: {
   *     // ... filter to delete one SubClass
   *   }
   * })
   * 
  **/
  delete<T extends SubClassDeleteArgs>(
    args: Subset<T, SubClassDeleteArgs>
  ): CheckSelect<T, Prisma__SubClassClient<SubClass>, Prisma__SubClassClient<SubClassGetPayload<T>>>
  /**
   * Update one SubClass.
   * @param {SubClassUpdateArgs} args - Arguments to update one SubClass.
   * @example
   * // Update one SubClass
   * const subClass = await prisma.subClass.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SubClassUpdateArgs>(
    args: Subset<T, SubClassUpdateArgs>
  ): CheckSelect<T, Prisma__SubClassClient<SubClass>, Prisma__SubClassClient<SubClassGetPayload<T>>>
  /**
   * Delete zero or more SubClasses.
   * @param {SubClassDeleteManyArgs} args - Arguments to filter SubClasses to delete.
   * @example
   * // Delete a few SubClasses
   * const { count } = await prisma.subClass.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SubClassDeleteManyArgs>(
    args: Subset<T, SubClassDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more SubClasses.
   * @param {SubClassUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many SubClasses
   * const subClass = await prisma.subClass.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SubClassUpdateManyArgs>(
    args: Subset<T, SubClassUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one SubClass.
   * @param {SubClassUpsertArgs} args - Arguments to update or create a SubClass.
   * @example
   * // Update or create a SubClass
   * const subClass = await prisma.subClass.upsert({
   *   create: {
   *     // ... data to create a SubClass
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the SubClass we want to update
   *   }
   * })
  **/
  upsert<T extends SubClassUpsertArgs>(
    args: Subset<T, SubClassUpsertArgs>
  ): CheckSelect<T, Prisma__SubClassClient<SubClass>, Prisma__SubClassClient<SubClassGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySubClassArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSubClassArgs>(args: Subset<T, AggregateSubClassArgs>): Promise<GetSubClassAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for SubClass.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SubClassClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * SubClass findOne
 */
export type FindOneSubClassArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * Filter, which SubClass to fetch.
  **/
  where: SubClassWhereUniqueInput
}


/**
 * SubClass findFirst
 */
export type FindFirstSubClassArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * Filter, which SubClass to fetch.
  **/
  where?: SubClassWhereInput
  orderBy?: Enumerable<SubClassOrderByInput> | SubClassOrderByInput
  cursor?: SubClassWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SubClassDistinctFieldEnum>
}


/**
 * SubClass findMany
 */
export type FindManySubClassArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * Filter, which SubClasses to fetch.
  **/
  where?: SubClassWhereInput
  /**
   * Determine the order of the SubClasses to fetch.
  **/
  orderBy?: Enumerable<SubClassOrderByInput> | SubClassOrderByInput
  /**
   * Sets the position for listing SubClasses.
  **/
  cursor?: SubClassWhereUniqueInput
  /**
   * The number of SubClasses to fetch. If negative number, it will take SubClasses before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` SubClasses.
  **/
  skip?: number
  distinct?: Enumerable<SubClassDistinctFieldEnum>
}


/**
 * SubClass create
 */
export type SubClassCreateArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * The data needed to create a SubClass.
  **/
  data: SubClassCreateInput
}


/**
 * SubClass update
 */
export type SubClassUpdateArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * The data needed to update a SubClass.
  **/
  data: SubClassUpdateInput
  /**
   * Choose, which SubClass to update.
  **/
  where: SubClassWhereUniqueInput
}


/**
 * SubClass updateMany
 */
export type SubClassUpdateManyArgs = {
  data: SubClassUpdateManyMutationInput
  where?: SubClassWhereInput
}


/**
 * SubClass upsert
 */
export type SubClassUpsertArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * The filter to search for the SubClass to update in case it exists.
  **/
  where: SubClassWhereUniqueInput
  /**
   * In case the SubClass found by the `where` argument doesn't exist, create a new SubClass with this data.
  **/
  create: SubClassCreateInput
  /**
   * In case the SubClass was found with the provided `where` argument, update it with this data.
  **/
  update: SubClassUpdateInput
}


/**
 * SubClass delete
 */
export type SubClassDeleteArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
  /**
   * Filter which SubClass to delete.
  **/
  where: SubClassWhereUniqueInput
}


/**
 * SubClass deleteMany
 */
export type SubClassDeleteManyArgs = {
  where?: SubClassWhereInput
}


/**
 * SubClass without action
 */
export type SubClassArgs = {
  /**
   * Select specific fields to fetch from the SubClass
  **/
  select?: SubClassSelect | null
}



/**
 * Model Deity
 */

export type Deity = {
  id: number
  name: string | null
}


export type AggregateDeity = {
  count: number
  avg: DeityAvgAggregateOutputType | null
  sum: DeitySumAggregateOutputType | null
  min: DeityMinAggregateOutputType | null
  max: DeityMaxAggregateOutputType | null
}

export type DeityAvgAggregateOutputType = {
  id: number
}

export type DeitySumAggregateOutputType = {
  id: number
}

export type DeityMinAggregateOutputType = {
  id: number
}

export type DeityMaxAggregateOutputType = {
  id: number
}


export type DeityAvgAggregateInputType = {
  id?: true
}

export type DeitySumAggregateInputType = {
  id?: true
}

export type DeityMinAggregateInputType = {
  id?: true
}

export type DeityMaxAggregateInputType = {
  id?: true
}

export type AggregateDeityArgs = {
  where?: DeityWhereInput
  orderBy?: Enumerable<DeityOrderByInput> | DeityOrderByInput
  cursor?: DeityWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DeityDistinctFieldEnum>
  count?: true
  avg?: DeityAvgAggregateInputType
  sum?: DeitySumAggregateInputType
  min?: DeityMinAggregateInputType
  max?: DeityMaxAggregateInputType
}

export type GetDeityAggregateType<T extends AggregateDeityArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetDeityAggregateScalarType<T[P]>
}

export type GetDeityAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof DeityAvgAggregateOutputType ? DeityAvgAggregateOutputType[P] : never
}
    
    

export type DeitySelect = {
  id?: boolean
  name?: boolean
}

export type DeityGetPayload<
  S extends boolean | null | undefined | DeityArgs,
  U = keyof S
> = S extends true
  ? Deity
  : S extends undefined
  ? never
  : S extends DeityArgs | FindManyDeityArgs
  ? 'include' extends U
    ? Deity 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Deity ? Deity[P]
: 
 never
    }
  : Deity
: Deity


export interface DeityDelegate {
  /**
   * Find zero or one Deity that matches the filter.
   * @param {FindOneDeityArgs} args - Arguments to find a Deity
   * @example
   * // Get one Deity
   * const deity = await prisma.deity.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneDeityArgs>(
    args: Subset<T, FindOneDeityArgs>
  ): CheckSelect<T, Prisma__DeityClient<Deity | null>, Prisma__DeityClient<DeityGetPayload<T> | null>>
  /**
   * Find the first Deity that matches the filter.
   * @param {FindFirstDeityArgs} args - Arguments to find a Deity
   * @example
   * // Get one Deity
   * const deity = await prisma.deity.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstDeityArgs>(
    args?: Subset<T, FindFirstDeityArgs>
  ): CheckSelect<T, Prisma__DeityClient<Deity | null>, Prisma__DeityClient<DeityGetPayload<T> | null>>
  /**
   * Find zero or more Deities that matches the filter.
   * @param {FindManyDeityArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Deities
   * const deities = await prisma.deity.findMany()
   * 
   * // Get first 10 Deities
   * const deities = await prisma.deity.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const deityWithIdOnly = await prisma.deity.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyDeityArgs>(
    args?: Subset<T, FindManyDeityArgs>
  ): CheckSelect<T, Promise<Array<Deity>>, Promise<Array<DeityGetPayload<T>>>>
  /**
   * Create a Deity.
   * @param {DeityCreateArgs} args - Arguments to create a Deity.
   * @example
   * // Create one Deity
   * const Deity = await prisma.deity.create({
   *   data: {
   *     // ... data to create a Deity
   *   }
   * })
   * 
  **/
  create<T extends DeityCreateArgs>(
    args: Subset<T, DeityCreateArgs>
  ): CheckSelect<T, Prisma__DeityClient<Deity>, Prisma__DeityClient<DeityGetPayload<T>>>
  /**
   * Delete a Deity.
   * @param {DeityDeleteArgs} args - Arguments to delete one Deity.
   * @example
   * // Delete one Deity
   * const Deity = await prisma.deity.delete({
   *   where: {
   *     // ... filter to delete one Deity
   *   }
   * })
   * 
  **/
  delete<T extends DeityDeleteArgs>(
    args: Subset<T, DeityDeleteArgs>
  ): CheckSelect<T, Prisma__DeityClient<Deity>, Prisma__DeityClient<DeityGetPayload<T>>>
  /**
   * Update one Deity.
   * @param {DeityUpdateArgs} args - Arguments to update one Deity.
   * @example
   * // Update one Deity
   * const deity = await prisma.deity.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends DeityUpdateArgs>(
    args: Subset<T, DeityUpdateArgs>
  ): CheckSelect<T, Prisma__DeityClient<Deity>, Prisma__DeityClient<DeityGetPayload<T>>>
  /**
   * Delete zero or more Deities.
   * @param {DeityDeleteManyArgs} args - Arguments to filter Deities to delete.
   * @example
   * // Delete a few Deities
   * const { count } = await prisma.deity.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends DeityDeleteManyArgs>(
    args: Subset<T, DeityDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Deities.
   * @param {DeityUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Deities
   * const deity = await prisma.deity.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends DeityUpdateManyArgs>(
    args: Subset<T, DeityUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Deity.
   * @param {DeityUpsertArgs} args - Arguments to update or create a Deity.
   * @example
   * // Update or create a Deity
   * const deity = await prisma.deity.upsert({
   *   create: {
   *     // ... data to create a Deity
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Deity we want to update
   *   }
   * })
  **/
  upsert<T extends DeityUpsertArgs>(
    args: Subset<T, DeityUpsertArgs>
  ): CheckSelect<T, Prisma__DeityClient<Deity>, Prisma__DeityClient<DeityGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyDeityArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateDeityArgs>(args: Subset<T, AggregateDeityArgs>): Promise<GetDeityAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Deity.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__DeityClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Deity findOne
 */
export type FindOneDeityArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * Filter, which Deity to fetch.
  **/
  where: DeityWhereUniqueInput
}


/**
 * Deity findFirst
 */
export type FindFirstDeityArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * Filter, which Deity to fetch.
  **/
  where?: DeityWhereInput
  orderBy?: Enumerable<DeityOrderByInput> | DeityOrderByInput
  cursor?: DeityWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DeityDistinctFieldEnum>
}


/**
 * Deity findMany
 */
export type FindManyDeityArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * Filter, which Deities to fetch.
  **/
  where?: DeityWhereInput
  /**
   * Determine the order of the Deities to fetch.
  **/
  orderBy?: Enumerable<DeityOrderByInput> | DeityOrderByInput
  /**
   * Sets the position for listing Deities.
  **/
  cursor?: DeityWhereUniqueInput
  /**
   * The number of Deities to fetch. If negative number, it will take Deities before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Deities.
  **/
  skip?: number
  distinct?: Enumerable<DeityDistinctFieldEnum>
}


/**
 * Deity create
 */
export type DeityCreateArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * The data needed to create a Deity.
  **/
  data: DeityCreateInput
}


/**
 * Deity update
 */
export type DeityUpdateArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * The data needed to update a Deity.
  **/
  data: DeityUpdateInput
  /**
   * Choose, which Deity to update.
  **/
  where: DeityWhereUniqueInput
}


/**
 * Deity updateMany
 */
export type DeityUpdateManyArgs = {
  data: DeityUpdateManyMutationInput
  where?: DeityWhereInput
}


/**
 * Deity upsert
 */
export type DeityUpsertArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * The filter to search for the Deity to update in case it exists.
  **/
  where: DeityWhereUniqueInput
  /**
   * In case the Deity found by the `where` argument doesn't exist, create a new Deity with this data.
  **/
  create: DeityCreateInput
  /**
   * In case the Deity was found with the provided `where` argument, update it with this data.
  **/
  update: DeityUpdateInput
}


/**
 * Deity delete
 */
export type DeityDeleteArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
  /**
   * Filter which Deity to delete.
  **/
  where: DeityWhereUniqueInput
}


/**
 * Deity deleteMany
 */
export type DeityDeleteManyArgs = {
  where?: DeityWhereInput
}


/**
 * Deity without action
 */
export type DeityArgs = {
  /**
   * Select specific fields to fetch from the Deity
  **/
  select?: DeitySelect | null
}



/**
 * Model Proficiency
 */

export type Proficiency = {
  id: number
  name: string | null
  classId: number | null
}


export type AggregateProficiency = {
  count: number
  avg: ProficiencyAvgAggregateOutputType | null
  sum: ProficiencySumAggregateOutputType | null
  min: ProficiencyMinAggregateOutputType | null
  max: ProficiencyMaxAggregateOutputType | null
}

export type ProficiencyAvgAggregateOutputType = {
  id: number
  classId: number | null
}

export type ProficiencySumAggregateOutputType = {
  id: number
  classId: number | null
}

export type ProficiencyMinAggregateOutputType = {
  id: number
  classId: number | null
}

export type ProficiencyMaxAggregateOutputType = {
  id: number
  classId: number | null
}


export type ProficiencyAvgAggregateInputType = {
  id?: true
  classId?: true
}

export type ProficiencySumAggregateInputType = {
  id?: true
  classId?: true
}

export type ProficiencyMinAggregateInputType = {
  id?: true
  classId?: true
}

export type ProficiencyMaxAggregateInputType = {
  id?: true
  classId?: true
}

export type AggregateProficiencyArgs = {
  where?: ProficiencyWhereInput
  orderBy?: Enumerable<ProficiencyOrderByInput> | ProficiencyOrderByInput
  cursor?: ProficiencyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProficiencyDistinctFieldEnum>
  count?: true
  avg?: ProficiencyAvgAggregateInputType
  sum?: ProficiencySumAggregateInputType
  min?: ProficiencyMinAggregateInputType
  max?: ProficiencyMaxAggregateInputType
}

export type GetProficiencyAggregateType<T extends AggregateProficiencyArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetProficiencyAggregateScalarType<T[P]>
}

export type GetProficiencyAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ProficiencyAvgAggregateOutputType ? ProficiencyAvgAggregateOutputType[P] : never
}
    
    

export type ProficiencySelect = {
  id?: boolean
  name?: boolean
  Class?: boolean | ClassArgs
  classId?: boolean
}

export type ProficiencyInclude = {
  Class?: boolean | ClassArgs
}

export type ProficiencyGetPayload<
  S extends boolean | null | undefined | ProficiencyArgs,
  U = keyof S
> = S extends true
  ? Proficiency
  : S extends undefined
  ? never
  : S extends ProficiencyArgs | FindManyProficiencyArgs
  ? 'include' extends U
    ? Proficiency  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Class'
      ? ClassGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Proficiency ? Proficiency[P]
: 
      P extends 'Class'
      ? ClassGetPayload<S['select'][P]> | null : never
    }
  : Proficiency
: Proficiency


export interface ProficiencyDelegate {
  /**
   * Find zero or one Proficiency that matches the filter.
   * @param {FindOneProficiencyArgs} args - Arguments to find a Proficiency
   * @example
   * // Get one Proficiency
   * const proficiency = await prisma.proficiency.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProficiencyArgs>(
    args: Subset<T, FindOneProficiencyArgs>
  ): CheckSelect<T, Prisma__ProficiencyClient<Proficiency | null>, Prisma__ProficiencyClient<ProficiencyGetPayload<T> | null>>
  /**
   * Find the first Proficiency that matches the filter.
   * @param {FindFirstProficiencyArgs} args - Arguments to find a Proficiency
   * @example
   * // Get one Proficiency
   * const proficiency = await prisma.proficiency.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstProficiencyArgs>(
    args?: Subset<T, FindFirstProficiencyArgs>
  ): CheckSelect<T, Prisma__ProficiencyClient<Proficiency | null>, Prisma__ProficiencyClient<ProficiencyGetPayload<T> | null>>
  /**
   * Find zero or more Proficiencies that matches the filter.
   * @param {FindManyProficiencyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Proficiencies
   * const proficiencies = await prisma.proficiency.findMany()
   * 
   * // Get first 10 Proficiencies
   * const proficiencies = await prisma.proficiency.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const proficiencyWithIdOnly = await prisma.proficiency.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyProficiencyArgs>(
    args?: Subset<T, FindManyProficiencyArgs>
  ): CheckSelect<T, Promise<Array<Proficiency>>, Promise<Array<ProficiencyGetPayload<T>>>>
  /**
   * Create a Proficiency.
   * @param {ProficiencyCreateArgs} args - Arguments to create a Proficiency.
   * @example
   * // Create one Proficiency
   * const Proficiency = await prisma.proficiency.create({
   *   data: {
   *     // ... data to create a Proficiency
   *   }
   * })
   * 
  **/
  create<T extends ProficiencyCreateArgs>(
    args: Subset<T, ProficiencyCreateArgs>
  ): CheckSelect<T, Prisma__ProficiencyClient<Proficiency>, Prisma__ProficiencyClient<ProficiencyGetPayload<T>>>
  /**
   * Delete a Proficiency.
   * @param {ProficiencyDeleteArgs} args - Arguments to delete one Proficiency.
   * @example
   * // Delete one Proficiency
   * const Proficiency = await prisma.proficiency.delete({
   *   where: {
   *     // ... filter to delete one Proficiency
   *   }
   * })
   * 
  **/
  delete<T extends ProficiencyDeleteArgs>(
    args: Subset<T, ProficiencyDeleteArgs>
  ): CheckSelect<T, Prisma__ProficiencyClient<Proficiency>, Prisma__ProficiencyClient<ProficiencyGetPayload<T>>>
  /**
   * Update one Proficiency.
   * @param {ProficiencyUpdateArgs} args - Arguments to update one Proficiency.
   * @example
   * // Update one Proficiency
   * const proficiency = await prisma.proficiency.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProficiencyUpdateArgs>(
    args: Subset<T, ProficiencyUpdateArgs>
  ): CheckSelect<T, Prisma__ProficiencyClient<Proficiency>, Prisma__ProficiencyClient<ProficiencyGetPayload<T>>>
  /**
   * Delete zero or more Proficiencies.
   * @param {ProficiencyDeleteManyArgs} args - Arguments to filter Proficiencies to delete.
   * @example
   * // Delete a few Proficiencies
   * const { count } = await prisma.proficiency.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProficiencyDeleteManyArgs>(
    args: Subset<T, ProficiencyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Proficiencies.
   * @param {ProficiencyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Proficiencies
   * const proficiency = await prisma.proficiency.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProficiencyUpdateManyArgs>(
    args: Subset<T, ProficiencyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Proficiency.
   * @param {ProficiencyUpsertArgs} args - Arguments to update or create a Proficiency.
   * @example
   * // Update or create a Proficiency
   * const proficiency = await prisma.proficiency.upsert({
   *   create: {
   *     // ... data to create a Proficiency
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Proficiency we want to update
   *   }
   * })
  **/
  upsert<T extends ProficiencyUpsertArgs>(
    args: Subset<T, ProficiencyUpsertArgs>
  ): CheckSelect<T, Prisma__ProficiencyClient<Proficiency>, Prisma__ProficiencyClient<ProficiencyGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyProficiencyArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateProficiencyArgs>(args: Subset<T, AggregateProficiencyArgs>): Promise<GetProficiencyAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Proficiency.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ProficiencyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Class<T extends ClassArgs = {}>(args?: Subset<T, ClassArgs>): CheckSelect<T, Prisma__ClassClient<Class | null>, Prisma__ClassClient<ClassGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Proficiency findOne
 */
export type FindOneProficiencyArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * Filter, which Proficiency to fetch.
  **/
  where: ProficiencyWhereUniqueInput
}


/**
 * Proficiency findFirst
 */
export type FindFirstProficiencyArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * Filter, which Proficiency to fetch.
  **/
  where?: ProficiencyWhereInput
  orderBy?: Enumerable<ProficiencyOrderByInput> | ProficiencyOrderByInput
  cursor?: ProficiencyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ProficiencyDistinctFieldEnum>
}


/**
 * Proficiency findMany
 */
export type FindManyProficiencyArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * Filter, which Proficiencies to fetch.
  **/
  where?: ProficiencyWhereInput
  /**
   * Determine the order of the Proficiencies to fetch.
  **/
  orderBy?: Enumerable<ProficiencyOrderByInput> | ProficiencyOrderByInput
  /**
   * Sets the position for listing Proficiencies.
  **/
  cursor?: ProficiencyWhereUniqueInput
  /**
   * The number of Proficiencies to fetch. If negative number, it will take Proficiencies before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Proficiencies.
  **/
  skip?: number
  distinct?: Enumerable<ProficiencyDistinctFieldEnum>
}


/**
 * Proficiency create
 */
export type ProficiencyCreateArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * The data needed to create a Proficiency.
  **/
  data: ProficiencyCreateInput
}


/**
 * Proficiency update
 */
export type ProficiencyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * The data needed to update a Proficiency.
  **/
  data: ProficiencyUpdateInput
  /**
   * Choose, which Proficiency to update.
  **/
  where: ProficiencyWhereUniqueInput
}


/**
 * Proficiency updateMany
 */
export type ProficiencyUpdateManyArgs = {
  data: ProficiencyUpdateManyMutationInput
  where?: ProficiencyWhereInput
}


/**
 * Proficiency upsert
 */
export type ProficiencyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * The filter to search for the Proficiency to update in case it exists.
  **/
  where: ProficiencyWhereUniqueInput
  /**
   * In case the Proficiency found by the `where` argument doesn't exist, create a new Proficiency with this data.
  **/
  create: ProficiencyCreateInput
  /**
   * In case the Proficiency was found with the provided `where` argument, update it with this data.
  **/
  update: ProficiencyUpdateInput
}


/**
 * Proficiency delete
 */
export type ProficiencyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
  /**
   * Filter which Proficiency to delete.
  **/
  where: ProficiencyWhereUniqueInput
}


/**
 * Proficiency deleteMany
 */
export type ProficiencyDeleteManyArgs = {
  where?: ProficiencyWhereInput
}


/**
 * Proficiency without action
 */
export type ProficiencyArgs = {
  /**
   * Select specific fields to fetch from the Proficiency
  **/
  select?: ProficiencySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProficiencyInclude | null
}



/**
 * Model Trait
 */

export type Trait = {
  id: number
  name: string | null
  description: string | null
  level: number
  classId: number | null
}


export type AggregateTrait = {
  count: number
  avg: TraitAvgAggregateOutputType | null
  sum: TraitSumAggregateOutputType | null
  min: TraitMinAggregateOutputType | null
  max: TraitMaxAggregateOutputType | null
}

export type TraitAvgAggregateOutputType = {
  id: number
  level: number
  classId: number | null
}

export type TraitSumAggregateOutputType = {
  id: number
  level: number
  classId: number | null
}

export type TraitMinAggregateOutputType = {
  id: number
  level: number
  classId: number | null
}

export type TraitMaxAggregateOutputType = {
  id: number
  level: number
  classId: number | null
}


export type TraitAvgAggregateInputType = {
  id?: true
  level?: true
  classId?: true
}

export type TraitSumAggregateInputType = {
  id?: true
  level?: true
  classId?: true
}

export type TraitMinAggregateInputType = {
  id?: true
  level?: true
  classId?: true
}

export type TraitMaxAggregateInputType = {
  id?: true
  level?: true
  classId?: true
}

export type AggregateTraitArgs = {
  where?: TraitWhereInput
  orderBy?: Enumerable<TraitOrderByInput> | TraitOrderByInput
  cursor?: TraitWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TraitDistinctFieldEnum>
  count?: true
  avg?: TraitAvgAggregateInputType
  sum?: TraitSumAggregateInputType
  min?: TraitMinAggregateInputType
  max?: TraitMaxAggregateInputType
}

export type GetTraitAggregateType<T extends AggregateTraitArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetTraitAggregateScalarType<T[P]>
}

export type GetTraitAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TraitAvgAggregateOutputType ? TraitAvgAggregateOutputType[P] : never
}
    
    

export type TraitSelect = {
  id?: boolean
  name?: boolean
  description?: boolean
  class?: boolean | ClassArgs
  level?: boolean
  classId?: boolean
}

export type TraitInclude = {
  class?: boolean | ClassArgs
}

export type TraitGetPayload<
  S extends boolean | null | undefined | TraitArgs,
  U = keyof S
> = S extends true
  ? Trait
  : S extends undefined
  ? never
  : S extends TraitArgs | FindManyTraitArgs
  ? 'include' extends U
    ? Trait  & {
      [P in TrueKeys<S['include']>]:
      P extends 'class'
      ? ClassGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Trait ? Trait[P]
: 
      P extends 'class'
      ? ClassGetPayload<S['select'][P]> | null : never
    }
  : Trait
: Trait


export interface TraitDelegate {
  /**
   * Find zero or one Trait that matches the filter.
   * @param {FindOneTraitArgs} args - Arguments to find a Trait
   * @example
   * // Get one Trait
   * const trait = await prisma.trait.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTraitArgs>(
    args: Subset<T, FindOneTraitArgs>
  ): CheckSelect<T, Prisma__TraitClient<Trait | null>, Prisma__TraitClient<TraitGetPayload<T> | null>>
  /**
   * Find the first Trait that matches the filter.
   * @param {FindFirstTraitArgs} args - Arguments to find a Trait
   * @example
   * // Get one Trait
   * const trait = await prisma.trait.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstTraitArgs>(
    args?: Subset<T, FindFirstTraitArgs>
  ): CheckSelect<T, Prisma__TraitClient<Trait | null>, Prisma__TraitClient<TraitGetPayload<T> | null>>
  /**
   * Find zero or more Traits that matches the filter.
   * @param {FindManyTraitArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Traits
   * const traits = await prisma.trait.findMany()
   * 
   * // Get first 10 Traits
   * const traits = await prisma.trait.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const traitWithIdOnly = await prisma.trait.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTraitArgs>(
    args?: Subset<T, FindManyTraitArgs>
  ): CheckSelect<T, Promise<Array<Trait>>, Promise<Array<TraitGetPayload<T>>>>
  /**
   * Create a Trait.
   * @param {TraitCreateArgs} args - Arguments to create a Trait.
   * @example
   * // Create one Trait
   * const Trait = await prisma.trait.create({
   *   data: {
   *     // ... data to create a Trait
   *   }
   * })
   * 
  **/
  create<T extends TraitCreateArgs>(
    args: Subset<T, TraitCreateArgs>
  ): CheckSelect<T, Prisma__TraitClient<Trait>, Prisma__TraitClient<TraitGetPayload<T>>>
  /**
   * Delete a Trait.
   * @param {TraitDeleteArgs} args - Arguments to delete one Trait.
   * @example
   * // Delete one Trait
   * const Trait = await prisma.trait.delete({
   *   where: {
   *     // ... filter to delete one Trait
   *   }
   * })
   * 
  **/
  delete<T extends TraitDeleteArgs>(
    args: Subset<T, TraitDeleteArgs>
  ): CheckSelect<T, Prisma__TraitClient<Trait>, Prisma__TraitClient<TraitGetPayload<T>>>
  /**
   * Update one Trait.
   * @param {TraitUpdateArgs} args - Arguments to update one Trait.
   * @example
   * // Update one Trait
   * const trait = await prisma.trait.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends TraitUpdateArgs>(
    args: Subset<T, TraitUpdateArgs>
  ): CheckSelect<T, Prisma__TraitClient<Trait>, Prisma__TraitClient<TraitGetPayload<T>>>
  /**
   * Delete zero or more Traits.
   * @param {TraitDeleteManyArgs} args - Arguments to filter Traits to delete.
   * @example
   * // Delete a few Traits
   * const { count } = await prisma.trait.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends TraitDeleteManyArgs>(
    args: Subset<T, TraitDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Traits.
   * @param {TraitUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Traits
   * const trait = await prisma.trait.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends TraitUpdateManyArgs>(
    args: Subset<T, TraitUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Trait.
   * @param {TraitUpsertArgs} args - Arguments to update or create a Trait.
   * @example
   * // Update or create a Trait
   * const trait = await prisma.trait.upsert({
   *   create: {
   *     // ... data to create a Trait
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Trait we want to update
   *   }
   * })
  **/
  upsert<T extends TraitUpsertArgs>(
    args: Subset<T, TraitUpsertArgs>
  ): CheckSelect<T, Prisma__TraitClient<Trait>, Prisma__TraitClient<TraitGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyTraitArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTraitArgs>(args: Subset<T, AggregateTraitArgs>): Promise<GetTraitAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Trait.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__TraitClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  class<T extends ClassArgs = {}>(args?: Subset<T, ClassArgs>): CheckSelect<T, Prisma__ClassClient<Class | null>, Prisma__ClassClient<ClassGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Trait findOne
 */
export type FindOneTraitArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * Filter, which Trait to fetch.
  **/
  where: TraitWhereUniqueInput
}


/**
 * Trait findFirst
 */
export type FindFirstTraitArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * Filter, which Trait to fetch.
  **/
  where?: TraitWhereInput
  orderBy?: Enumerable<TraitOrderByInput> | TraitOrderByInput
  cursor?: TraitWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TraitDistinctFieldEnum>
}


/**
 * Trait findMany
 */
export type FindManyTraitArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * Filter, which Traits to fetch.
  **/
  where?: TraitWhereInput
  /**
   * Determine the order of the Traits to fetch.
  **/
  orderBy?: Enumerable<TraitOrderByInput> | TraitOrderByInput
  /**
   * Sets the position for listing Traits.
  **/
  cursor?: TraitWhereUniqueInput
  /**
   * The number of Traits to fetch. If negative number, it will take Traits before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Traits.
  **/
  skip?: number
  distinct?: Enumerable<TraitDistinctFieldEnum>
}


/**
 * Trait create
 */
export type TraitCreateArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * The data needed to create a Trait.
  **/
  data: TraitCreateInput
}


/**
 * Trait update
 */
export type TraitUpdateArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * The data needed to update a Trait.
  **/
  data: TraitUpdateInput
  /**
   * Choose, which Trait to update.
  **/
  where: TraitWhereUniqueInput
}


/**
 * Trait updateMany
 */
export type TraitUpdateManyArgs = {
  data: TraitUpdateManyMutationInput
  where?: TraitWhereInput
}


/**
 * Trait upsert
 */
export type TraitUpsertArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * The filter to search for the Trait to update in case it exists.
  **/
  where: TraitWhereUniqueInput
  /**
   * In case the Trait found by the `where` argument doesn't exist, create a new Trait with this data.
  **/
  create: TraitCreateInput
  /**
   * In case the Trait was found with the provided `where` argument, update it with this data.
  **/
  update: TraitUpdateInput
}


/**
 * Trait delete
 */
export type TraitDeleteArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
  /**
   * Filter which Trait to delete.
  **/
  where: TraitWhereUniqueInput
}


/**
 * Trait deleteMany
 */
export type TraitDeleteManyArgs = {
  where?: TraitWhereInput
}


/**
 * Trait without action
 */
export type TraitArgs = {
  /**
   * Select specific fields to fetch from the Trait
  **/
  select?: TraitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: TraitInclude | null
}



/**
 * Deep Input Types
 */


export type CharacterWhereInput = {
  AND?: CharacterWhereInput | Enumerable<CharacterWhereInput>
  OR?: CharacterWhereInput | Enumerable<CharacterWhereInput>
  NOT?: CharacterWhereInput | Enumerable<CharacterWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  name?: StringNullableFilter | string | null
  race?: RaceRelationFilter | RaceWhereInput
  raceId?: IntFilter | number
  class?: ClassRelationFilter | ClassWhereInput
  classId?: IntFilter | number
  alignment?: StringFilter | string
  experience?: IntFilter | number
  background?: StringFilter | string
  personality?: StringFilter | string
  ideals?: StringFilter | string
  bonds?: StringFilter | string
  flaw?: StringFilter | string
  hp?: IntFilter | number
  temphp?: IntFilter | number
  maxhp?: IntFilter | number
  strength?: IntFilter | number
  dexterity?: IntFilter | number
  intelligence?: IntFilter | number
  wisdom?: IntFilter | number
  charisma?: IntFilter | number
  age?: IntFilter | number
  size?: StringFilter | string
  height?: StringFilter | string
  weight?: StringFilter | string
  eyes?: StringFilter | string
  skin?: StringFilter | string
  hair?: StringFilter | string
  appearance?: StringFilter | string
  allies_org?: StringFilter | string
  backstory?: StringFilter | string
  treasure?: StringFilter | string
  equipment?: CharacterEquipmentListRelationFilter
  CharacterSkills?: CharacterSkillsListRelationFilter
  CharacterSpells?: CharacterSpellsListRelationFilter
}

export type CharacterOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  name?: SortOrder
  raceId?: SortOrder
  classId?: SortOrder
  alignment?: SortOrder
  experience?: SortOrder
  background?: SortOrder
  personality?: SortOrder
  ideals?: SortOrder
  bonds?: SortOrder
  flaw?: SortOrder
  hp?: SortOrder
  temphp?: SortOrder
  maxhp?: SortOrder
  strength?: SortOrder
  dexterity?: SortOrder
  intelligence?: SortOrder
  wisdom?: SortOrder
  charisma?: SortOrder
  age?: SortOrder
  size?: SortOrder
  height?: SortOrder
  weight?: SortOrder
  eyes?: SortOrder
  skin?: SortOrder
  hair?: SortOrder
  appearance?: SortOrder
  allies_org?: SortOrder
  backstory?: SortOrder
  treasure?: SortOrder
}

export type CharacterWhereUniqueInput = {
  id?: number
}

export type CharacterEquipmentWhereInput = {
  AND?: CharacterEquipmentWhereInput | Enumerable<CharacterEquipmentWhereInput>
  OR?: CharacterEquipmentWhereInput | Enumerable<CharacterEquipmentWhereInput>
  NOT?: CharacterEquipmentWhereInput | Enumerable<CharacterEquipmentWhereInput>
  id?: IntFilter | number
  character?: CharacterRelationFilter | CharacterWhereInput
  item?: EquipmentRelationFilter | EquipmentWhereInput
  characterId?: IntFilter | number
  equipmentId?: IntFilter | number
}

export type CharacterEquipmentOrderByInput = {
  id?: SortOrder
  characterId?: SortOrder
  equipmentId?: SortOrder
}

export type CharacterEquipmentWhereUniqueInput = {
  id?: number
}

export type CharacterSkillsWhereInput = {
  AND?: CharacterSkillsWhereInput | Enumerable<CharacterSkillsWhereInput>
  OR?: CharacterSkillsWhereInput | Enumerable<CharacterSkillsWhereInput>
  NOT?: CharacterSkillsWhereInput | Enumerable<CharacterSkillsWhereInput>
  id?: IntFilter | number
  character?: CharacterRelationFilter | CharacterWhereInput
  skill?: SkillRelationFilter | SkillWhereInput
  characterId?: IntFilter | number
  skillId?: IntFilter | number
}

export type CharacterSkillsOrderByInput = {
  id?: SortOrder
  characterId?: SortOrder
  skillId?: SortOrder
}

export type CharacterSkillsWhereUniqueInput = {
  id?: number
}

export type CharacterSpellsWhereInput = {
  AND?: CharacterSpellsWhereInput | Enumerable<CharacterSpellsWhereInput>
  OR?: CharacterSpellsWhereInput | Enumerable<CharacterSpellsWhereInput>
  NOT?: CharacterSpellsWhereInput | Enumerable<CharacterSpellsWhereInput>
  id?: IntFilter | number
  character?: CharacterRelationFilter | CharacterWhereInput
  spell?: SpellRelationFilter | SpellWhereInput
  characterId?: IntFilter | number
  spellId?: IntFilter | number
}

export type CharacterSpellsOrderByInput = {
  id?: SortOrder
  characterId?: SortOrder
  spellId?: SortOrder
}

export type CharacterSpellsWhereUniqueInput = {
  id?: number
}

export type EquipmentWhereInput = {
  AND?: EquipmentWhereInput | Enumerable<EquipmentWhereInput>
  OR?: EquipmentWhereInput | Enumerable<EquipmentWhereInput>
  NOT?: EquipmentWhereInput | Enumerable<EquipmentWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  type?: StringNullableFilter | string | null
  description?: StringNullableFilter | string | null
  CharacterEquipment?: CharacterEquipmentListRelationFilter
}

export type EquipmentOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  type?: SortOrder
  description?: SortOrder
}

export type EquipmentWhereUniqueInput = {
  id?: number
}

export type DiceModifierWhereInput = {
  AND?: DiceModifierWhereInput | Enumerable<DiceModifierWhereInput>
  OR?: DiceModifierWhereInput | Enumerable<DiceModifierWhereInput>
  NOT?: DiceModifierWhereInput | Enumerable<DiceModifierWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  scope?: StringNullableFilter | string | null
  diceSides?: IntNullableFilter | number | null
  rollType?: StringNullableFilter | string | null
}

export type DiceModifierOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  scope?: SortOrder
  diceSides?: SortOrder
  rollType?: SortOrder
}

export type DiceModifierWhereUniqueInput = {
  id?: number
}

export type RaceWhereInput = {
  AND?: RaceWhereInput | Enumerable<RaceWhereInput>
  OR?: RaceWhereInput | Enumerable<RaceWhereInput>
  NOT?: RaceWhereInput | Enumerable<RaceWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  Character?: CharacterListRelationFilter
}

export type RaceOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type RaceWhereUniqueInput = {
  id?: number
}

export type ClassWhereInput = {
  AND?: ClassWhereInput | Enumerable<ClassWhereInput>
  OR?: ClassWhereInput | Enumerable<ClassWhereInput>
  NOT?: ClassWhereInput | Enumerable<ClassWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  hitdice?: StringNullableFilter | string | null
  hpfirstlevel?: IntNullableFilter | number | null
  hpperlevel?: IntNullableFilter | number | null
  hpperlevel_roll?: IntNullableFilter | number | null
  proficiencies?: ProficiencyListRelationFilter
  traits?: TraitListRelationFilter
  Character?: CharacterListRelationFilter
}

export type ClassOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  hitdice?: SortOrder
  hpfirstlevel?: SortOrder
  hpperlevel?: SortOrder
  hpperlevel_roll?: SortOrder
}

export type ClassWhereUniqueInput = {
  id?: number
}

export type SkillWhereInput = {
  AND?: SkillWhereInput | Enumerable<SkillWhereInput>
  OR?: SkillWhereInput | Enumerable<SkillWhereInput>
  NOT?: SkillWhereInput | Enumerable<SkillWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  CharacterSkills?: CharacterSkillsListRelationFilter
}

export type SkillOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type SkillWhereUniqueInput = {
  id?: number
}

export type SpellWhereInput = {
  AND?: SpellWhereInput | Enumerable<SpellWhereInput>
  OR?: SpellWhereInput | Enumerable<SpellWhereInput>
  NOT?: SpellWhereInput | Enumerable<SpellWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  CharacterSpells?: CharacterSpellsListRelationFilter
}

export type SpellOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type SpellWhereUniqueInput = {
  id?: number
}

export type SubClassWhereInput = {
  AND?: SubClassWhereInput | Enumerable<SubClassWhereInput>
  OR?: SubClassWhereInput | Enumerable<SubClassWhereInput>
  NOT?: SubClassWhereInput | Enumerable<SubClassWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
}

export type SubClassOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type SubClassWhereUniqueInput = {
  id?: number
}

export type DeityWhereInput = {
  AND?: DeityWhereInput | Enumerable<DeityWhereInput>
  OR?: DeityWhereInput | Enumerable<DeityWhereInput>
  NOT?: DeityWhereInput | Enumerable<DeityWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
}

export type DeityOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type DeityWhereUniqueInput = {
  id?: number
}

export type ProficiencyWhereInput = {
  AND?: ProficiencyWhereInput | Enumerable<ProficiencyWhereInput>
  OR?: ProficiencyWhereInput | Enumerable<ProficiencyWhereInput>
  NOT?: ProficiencyWhereInput | Enumerable<ProficiencyWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  Class?: ClassRelationFilter | ClassWhereInput | null
  classId?: IntNullableFilter | number | null
}

export type ProficiencyOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  classId?: SortOrder
}

export type ProficiencyWhereUniqueInput = {
  id?: number
}

export type TraitWhereInput = {
  AND?: TraitWhereInput | Enumerable<TraitWhereInput>
  OR?: TraitWhereInput | Enumerable<TraitWhereInput>
  NOT?: TraitWhereInput | Enumerable<TraitWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  description?: StringNullableFilter | string | null
  class?: ClassRelationFilter | ClassWhereInput | null
  level?: IntFilter | number
  classId?: IntNullableFilter | number | null
}

export type TraitOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  description?: SortOrder
  level?: SortOrder
  classId?: SortOrder
}

export type TraitWhereUniqueInput = {
  id?: number
}

export type CharacterCreateInput = {
  createdAt?: Date | string
  name?: string | null
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
  race: RaceCreateOneWithoutCharacterInput
  class: ClassCreateOneWithoutCharacterInput
  equipment?: CharacterEquipmentCreateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsCreateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsCreateManyWithoutCharacterInput
}

export type CharacterUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
  race?: RaceUpdateOneRequiredWithoutCharacterInput
  class?: ClassUpdateOneRequiredWithoutCharacterInput
  equipment?: CharacterEquipmentUpdateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsUpdateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsUpdateManyWithoutCharacterInput
}

export type CharacterUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
}

export type CharacterEquipmentCreateInput = {
  character: CharacterCreateOneWithoutEquipmentInput
  item: EquipmentCreateOneWithoutCharacterEquipmentInput
}

export type CharacterEquipmentUpdateInput = {
  character?: CharacterUpdateOneRequiredWithoutEquipmentInput
  item?: EquipmentUpdateOneRequiredWithoutCharacterEquipmentInput
}

export type CharacterEquipmentUpdateManyMutationInput = {

}

export type CharacterSkillsCreateInput = {
  character: CharacterCreateOneWithoutCharacterSkillsInput
  skill: SkillCreateOneWithoutCharacterSkillsInput
}

export type CharacterSkillsUpdateInput = {
  character?: CharacterUpdateOneRequiredWithoutCharacterSkillsInput
  skill?: SkillUpdateOneRequiredWithoutCharacterSkillsInput
}

export type CharacterSkillsUpdateManyMutationInput = {

}

export type CharacterSpellsCreateInput = {
  character: CharacterCreateOneWithoutCharacterSpellsInput
  spell: SpellCreateOneWithoutCharacterSpellsInput
}

export type CharacterSpellsUpdateInput = {
  character?: CharacterUpdateOneRequiredWithoutCharacterSpellsInput
  spell?: SpellUpdateOneRequiredWithoutCharacterSpellsInput
}

export type CharacterSpellsUpdateManyMutationInput = {

}

export type EquipmentCreateInput = {
  name?: string | null
  type?: string | null
  description?: string | null
  CharacterEquipment?: CharacterEquipmentCreateManyWithoutItemInput
}

export type EquipmentUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  type?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  CharacterEquipment?: CharacterEquipmentUpdateManyWithoutItemInput
}

export type EquipmentUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  type?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
}

export type DiceModifierCreateInput = {
  name?: string | null
  scope?: string | null
  diceSides?: number | null
  rollType?: string | null
}

export type DiceModifierUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  scope?: string | NullableStringFieldUpdateOperationsInput | null
  diceSides?: number | NullableIntFieldUpdateOperationsInput | null
  rollType?: string | NullableStringFieldUpdateOperationsInput | null
}

export type DiceModifierUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  scope?: string | NullableStringFieldUpdateOperationsInput | null
  diceSides?: number | NullableIntFieldUpdateOperationsInput | null
  rollType?: string | NullableStringFieldUpdateOperationsInput | null
}

export type RaceCreateInput = {
  name?: string | null
  Character?: CharacterCreateManyWithoutRaceInput
}

export type RaceUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  Character?: CharacterUpdateManyWithoutRaceInput
}

export type RaceUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ClassCreateInput = {
  name?: string | null
  hitdice?: string | null
  hpfirstlevel?: number | null
  hpperlevel?: number | null
  hpperlevel_roll?: number | null
  proficiencies?: ProficiencyCreateManyWithoutClassInput
  traits?: TraitCreateManyWithoutClassInput
  Character?: CharacterCreateManyWithoutClassInput
}

export type ClassUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  hitdice?: string | NullableStringFieldUpdateOperationsInput | null
  hpfirstlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel_roll?: number | NullableIntFieldUpdateOperationsInput | null
  proficiencies?: ProficiencyUpdateManyWithoutClassInput
  traits?: TraitUpdateManyWithoutClassInput
  Character?: CharacterUpdateManyWithoutClassInput
}

export type ClassUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  hitdice?: string | NullableStringFieldUpdateOperationsInput | null
  hpfirstlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel_roll?: number | NullableIntFieldUpdateOperationsInput | null
}

export type SkillCreateInput = {
  name?: string | null
  CharacterSkills?: CharacterSkillsCreateManyWithoutSkillInput
}

export type SkillUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  CharacterSkills?: CharacterSkillsUpdateManyWithoutSkillInput
}

export type SkillUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SpellCreateInput = {
  name?: string | null
  CharacterSpells?: CharacterSpellsCreateManyWithoutSpellInput
}

export type SpellUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  CharacterSpells?: CharacterSpellsUpdateManyWithoutSpellInput
}

export type SpellUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SubClassCreateInput = {
  name?: string | null
}

export type SubClassUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SubClassUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type DeityCreateInput = {
  name?: string | null
}

export type DeityUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type DeityUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ProficiencyCreateInput = {
  name?: string | null
  Class?: ClassCreateOneWithoutProficienciesInput
}

export type ProficiencyUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  Class?: ClassUpdateOneWithoutProficienciesInput
}

export type ProficiencyUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type TraitCreateInput = {
  name?: string | null
  description?: string | null
  level: number
  class?: ClassCreateOneWithoutTraitsInput
}

export type TraitUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  level?: number | IntFieldUpdateOperationsInput
  class?: ClassUpdateOneWithoutTraitsInput
}

export type TraitUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  level?: number | IntFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type RaceRelationFilter = {
  is?: RaceWhereInput
  isNot?: RaceWhereInput
}

export type ClassRelationFilter = {
  is?: ClassWhereInput | null
  isNot?: ClassWhereInput | null
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type CharacterEquipmentListRelationFilter = {
  every?: CharacterEquipmentWhereInput
  some?: CharacterEquipmentWhereInput
  none?: CharacterEquipmentWhereInput
}

export type CharacterSkillsListRelationFilter = {
  every?: CharacterSkillsWhereInput
  some?: CharacterSkillsWhereInput
  none?: CharacterSkillsWhereInput
}

export type CharacterSpellsListRelationFilter = {
  every?: CharacterSpellsWhereInput
  some?: CharacterSpellsWhereInput
  none?: CharacterSpellsWhereInput
}

export type CharacterRelationFilter = {
  is?: CharacterWhereInput
  isNot?: CharacterWhereInput
}

export type EquipmentRelationFilter = {
  is?: EquipmentWhereInput
  isNot?: EquipmentWhereInput
}

export type SkillRelationFilter = {
  is?: SkillWhereInput
  isNot?: SkillWhereInput
}

export type SpellRelationFilter = {
  is?: SpellWhereInput
  isNot?: SpellWhereInput
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type CharacterListRelationFilter = {
  every?: CharacterWhereInput
  some?: CharacterWhereInput
  none?: CharacterWhereInput
}

export type ProficiencyListRelationFilter = {
  every?: ProficiencyWhereInput
  some?: ProficiencyWhereInput
  none?: ProficiencyWhereInput
}

export type TraitListRelationFilter = {
  every?: TraitWhereInput
  some?: TraitWhereInput
  none?: TraitWhereInput
}

export type RaceCreateOneWithoutCharacterInput = {
  create?: RaceCreateWithoutCharacterInput
  connect?: RaceWhereUniqueInput
}

export type ClassCreateOneWithoutCharacterInput = {
  create?: ClassCreateWithoutCharacterInput
  connect?: ClassWhereUniqueInput
}

export type CharacterEquipmentCreateManyWithoutCharacterInput = {
  create?: CharacterEquipmentCreateWithoutCharacterInput | Enumerable<CharacterEquipmentCreateWithoutCharacterInput>
  connect?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
}

export type CharacterSkillsCreateManyWithoutCharacterInput = {
  create?: CharacterSkillsCreateWithoutCharacterInput | Enumerable<CharacterSkillsCreateWithoutCharacterInput>
  connect?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
}

export type CharacterSpellsCreateManyWithoutCharacterInput = {
  create?: CharacterSpellsCreateWithoutCharacterInput | Enumerable<CharacterSpellsCreateWithoutCharacterInput>
  connect?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type IntFieldUpdateOperationsInput = {
  set?: number
}

export type RaceUpdateOneRequiredWithoutCharacterInput = {
  create?: RaceCreateWithoutCharacterInput
  connect?: RaceWhereUniqueInput
  update?: RaceUpdateWithoutCharacterDataInput
  upsert?: RaceUpsertWithoutCharacterInput
}

export type ClassUpdateOneRequiredWithoutCharacterInput = {
  create?: ClassCreateWithoutCharacterInput
  connect?: ClassWhereUniqueInput
  update?: ClassUpdateWithoutCharacterDataInput
  upsert?: ClassUpsertWithoutCharacterInput
}

export type CharacterEquipmentUpdateManyWithoutCharacterInput = {
  create?: CharacterEquipmentCreateWithoutCharacterInput | Enumerable<CharacterEquipmentCreateWithoutCharacterInput>
  connect?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  set?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  disconnect?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  delete?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  update?: CharacterEquipmentUpdateWithWhereUniqueWithoutCharacterInput | Enumerable<CharacterEquipmentUpdateWithWhereUniqueWithoutCharacterInput>
  updateMany?: CharacterEquipmentUpdateManyWithWhereNestedInput | Enumerable<CharacterEquipmentUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterEquipmentScalarWhereInput | Enumerable<CharacterEquipmentScalarWhereInput>
  upsert?: CharacterEquipmentUpsertWithWhereUniqueWithoutCharacterInput | Enumerable<CharacterEquipmentUpsertWithWhereUniqueWithoutCharacterInput>
}

export type CharacterSkillsUpdateManyWithoutCharacterInput = {
  create?: CharacterSkillsCreateWithoutCharacterInput | Enumerable<CharacterSkillsCreateWithoutCharacterInput>
  connect?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  set?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  disconnect?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  delete?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  update?: CharacterSkillsUpdateWithWhereUniqueWithoutCharacterInput | Enumerable<CharacterSkillsUpdateWithWhereUniqueWithoutCharacterInput>
  updateMany?: CharacterSkillsUpdateManyWithWhereNestedInput | Enumerable<CharacterSkillsUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterSkillsScalarWhereInput | Enumerable<CharacterSkillsScalarWhereInput>
  upsert?: CharacterSkillsUpsertWithWhereUniqueWithoutCharacterInput | Enumerable<CharacterSkillsUpsertWithWhereUniqueWithoutCharacterInput>
}

export type CharacterSpellsUpdateManyWithoutCharacterInput = {
  create?: CharacterSpellsCreateWithoutCharacterInput | Enumerable<CharacterSpellsCreateWithoutCharacterInput>
  connect?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  set?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  disconnect?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  delete?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  update?: CharacterSpellsUpdateWithWhereUniqueWithoutCharacterInput | Enumerable<CharacterSpellsUpdateWithWhereUniqueWithoutCharacterInput>
  updateMany?: CharacterSpellsUpdateManyWithWhereNestedInput | Enumerable<CharacterSpellsUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterSpellsScalarWhereInput | Enumerable<CharacterSpellsScalarWhereInput>
  upsert?: CharacterSpellsUpsertWithWhereUniqueWithoutCharacterInput | Enumerable<CharacterSpellsUpsertWithWhereUniqueWithoutCharacterInput>
}

export type CharacterCreateOneWithoutEquipmentInput = {
  create?: CharacterCreateWithoutEquipmentInput
  connect?: CharacterWhereUniqueInput
}

export type EquipmentCreateOneWithoutCharacterEquipmentInput = {
  create?: EquipmentCreateWithoutCharacterEquipmentInput
  connect?: EquipmentWhereUniqueInput
}

export type CharacterUpdateOneRequiredWithoutEquipmentInput = {
  create?: CharacterCreateWithoutEquipmentInput
  connect?: CharacterWhereUniqueInput
  update?: CharacterUpdateWithoutEquipmentDataInput
  upsert?: CharacterUpsertWithoutEquipmentInput
}

export type EquipmentUpdateOneRequiredWithoutCharacterEquipmentInput = {
  create?: EquipmentCreateWithoutCharacterEquipmentInput
  connect?: EquipmentWhereUniqueInput
  update?: EquipmentUpdateWithoutCharacterEquipmentDataInput
  upsert?: EquipmentUpsertWithoutCharacterEquipmentInput
}

export type CharacterCreateOneWithoutCharacterSkillsInput = {
  create?: CharacterCreateWithoutCharacterSkillsInput
  connect?: CharacterWhereUniqueInput
}

export type SkillCreateOneWithoutCharacterSkillsInput = {
  create?: SkillCreateWithoutCharacterSkillsInput
  connect?: SkillWhereUniqueInput
}

export type CharacterUpdateOneRequiredWithoutCharacterSkillsInput = {
  create?: CharacterCreateWithoutCharacterSkillsInput
  connect?: CharacterWhereUniqueInput
  update?: CharacterUpdateWithoutCharacterSkillsDataInput
  upsert?: CharacterUpsertWithoutCharacterSkillsInput
}

export type SkillUpdateOneRequiredWithoutCharacterSkillsInput = {
  create?: SkillCreateWithoutCharacterSkillsInput
  connect?: SkillWhereUniqueInput
  update?: SkillUpdateWithoutCharacterSkillsDataInput
  upsert?: SkillUpsertWithoutCharacterSkillsInput
}

export type CharacterCreateOneWithoutCharacterSpellsInput = {
  create?: CharacterCreateWithoutCharacterSpellsInput
  connect?: CharacterWhereUniqueInput
}

export type SpellCreateOneWithoutCharacterSpellsInput = {
  create?: SpellCreateWithoutCharacterSpellsInput
  connect?: SpellWhereUniqueInput
}

export type CharacterUpdateOneRequiredWithoutCharacterSpellsInput = {
  create?: CharacterCreateWithoutCharacterSpellsInput
  connect?: CharacterWhereUniqueInput
  update?: CharacterUpdateWithoutCharacterSpellsDataInput
  upsert?: CharacterUpsertWithoutCharacterSpellsInput
}

export type SpellUpdateOneRequiredWithoutCharacterSpellsInput = {
  create?: SpellCreateWithoutCharacterSpellsInput
  connect?: SpellWhereUniqueInput
  update?: SpellUpdateWithoutCharacterSpellsDataInput
  upsert?: SpellUpsertWithoutCharacterSpellsInput
}

export type CharacterEquipmentCreateManyWithoutItemInput = {
  create?: CharacterEquipmentCreateWithoutItemInput | Enumerable<CharacterEquipmentCreateWithoutItemInput>
  connect?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
}

export type CharacterEquipmentUpdateManyWithoutItemInput = {
  create?: CharacterEquipmentCreateWithoutItemInput | Enumerable<CharacterEquipmentCreateWithoutItemInput>
  connect?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  set?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  disconnect?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  delete?: CharacterEquipmentWhereUniqueInput | Enumerable<CharacterEquipmentWhereUniqueInput>
  update?: CharacterEquipmentUpdateWithWhereUniqueWithoutItemInput | Enumerable<CharacterEquipmentUpdateWithWhereUniqueWithoutItemInput>
  updateMany?: CharacterEquipmentUpdateManyWithWhereNestedInput | Enumerable<CharacterEquipmentUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterEquipmentScalarWhereInput | Enumerable<CharacterEquipmentScalarWhereInput>
  upsert?: CharacterEquipmentUpsertWithWhereUniqueWithoutItemInput | Enumerable<CharacterEquipmentUpsertWithWhereUniqueWithoutItemInput>
}

export type NullableIntFieldUpdateOperationsInput = {
  set?: number | null
}

export type CharacterCreateManyWithoutRaceInput = {
  create?: CharacterCreateWithoutRaceInput | Enumerable<CharacterCreateWithoutRaceInput>
  connect?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
}

export type CharacterUpdateManyWithoutRaceInput = {
  create?: CharacterCreateWithoutRaceInput | Enumerable<CharacterCreateWithoutRaceInput>
  connect?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  set?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  disconnect?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  delete?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  update?: CharacterUpdateWithWhereUniqueWithoutRaceInput | Enumerable<CharacterUpdateWithWhereUniqueWithoutRaceInput>
  updateMany?: CharacterUpdateManyWithWhereNestedInput | Enumerable<CharacterUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterScalarWhereInput | Enumerable<CharacterScalarWhereInput>
  upsert?: CharacterUpsertWithWhereUniqueWithoutRaceInput | Enumerable<CharacterUpsertWithWhereUniqueWithoutRaceInput>
}

export type ProficiencyCreateManyWithoutClassInput = {
  create?: ProficiencyCreateWithoutClassInput | Enumerable<ProficiencyCreateWithoutClassInput>
  connect?: ProficiencyWhereUniqueInput | Enumerable<ProficiencyWhereUniqueInput>
}

export type TraitCreateManyWithoutClassInput = {
  create?: TraitCreateWithoutClassInput | Enumerable<TraitCreateWithoutClassInput>
  connect?: TraitWhereUniqueInput | Enumerable<TraitWhereUniqueInput>
}

export type CharacterCreateManyWithoutClassInput = {
  create?: CharacterCreateWithoutClassInput | Enumerable<CharacterCreateWithoutClassInput>
  connect?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
}

export type ProficiencyUpdateManyWithoutClassInput = {
  create?: ProficiencyCreateWithoutClassInput | Enumerable<ProficiencyCreateWithoutClassInput>
  connect?: ProficiencyWhereUniqueInput | Enumerable<ProficiencyWhereUniqueInput>
  set?: ProficiencyWhereUniqueInput | Enumerable<ProficiencyWhereUniqueInput>
  disconnect?: ProficiencyWhereUniqueInput | Enumerable<ProficiencyWhereUniqueInput>
  delete?: ProficiencyWhereUniqueInput | Enumerable<ProficiencyWhereUniqueInput>
  update?: ProficiencyUpdateWithWhereUniqueWithoutClassInput | Enumerable<ProficiencyUpdateWithWhereUniqueWithoutClassInput>
  updateMany?: ProficiencyUpdateManyWithWhereNestedInput | Enumerable<ProficiencyUpdateManyWithWhereNestedInput>
  deleteMany?: ProficiencyScalarWhereInput | Enumerable<ProficiencyScalarWhereInput>
  upsert?: ProficiencyUpsertWithWhereUniqueWithoutClassInput | Enumerable<ProficiencyUpsertWithWhereUniqueWithoutClassInput>
}

export type TraitUpdateManyWithoutClassInput = {
  create?: TraitCreateWithoutClassInput | Enumerable<TraitCreateWithoutClassInput>
  connect?: TraitWhereUniqueInput | Enumerable<TraitWhereUniqueInput>
  set?: TraitWhereUniqueInput | Enumerable<TraitWhereUniqueInput>
  disconnect?: TraitWhereUniqueInput | Enumerable<TraitWhereUniqueInput>
  delete?: TraitWhereUniqueInput | Enumerable<TraitWhereUniqueInput>
  update?: TraitUpdateWithWhereUniqueWithoutClassInput | Enumerable<TraitUpdateWithWhereUniqueWithoutClassInput>
  updateMany?: TraitUpdateManyWithWhereNestedInput | Enumerable<TraitUpdateManyWithWhereNestedInput>
  deleteMany?: TraitScalarWhereInput | Enumerable<TraitScalarWhereInput>
  upsert?: TraitUpsertWithWhereUniqueWithoutClassInput | Enumerable<TraitUpsertWithWhereUniqueWithoutClassInput>
}

export type CharacterUpdateManyWithoutClassInput = {
  create?: CharacterCreateWithoutClassInput | Enumerable<CharacterCreateWithoutClassInput>
  connect?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  set?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  disconnect?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  delete?: CharacterWhereUniqueInput | Enumerable<CharacterWhereUniqueInput>
  update?: CharacterUpdateWithWhereUniqueWithoutClassInput | Enumerable<CharacterUpdateWithWhereUniqueWithoutClassInput>
  updateMany?: CharacterUpdateManyWithWhereNestedInput | Enumerable<CharacterUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterScalarWhereInput | Enumerable<CharacterScalarWhereInput>
  upsert?: CharacterUpsertWithWhereUniqueWithoutClassInput | Enumerable<CharacterUpsertWithWhereUniqueWithoutClassInput>
}

export type CharacterSkillsCreateManyWithoutSkillInput = {
  create?: CharacterSkillsCreateWithoutSkillInput | Enumerable<CharacterSkillsCreateWithoutSkillInput>
  connect?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
}

export type CharacterSkillsUpdateManyWithoutSkillInput = {
  create?: CharacterSkillsCreateWithoutSkillInput | Enumerable<CharacterSkillsCreateWithoutSkillInput>
  connect?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  set?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  disconnect?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  delete?: CharacterSkillsWhereUniqueInput | Enumerable<CharacterSkillsWhereUniqueInput>
  update?: CharacterSkillsUpdateWithWhereUniqueWithoutSkillInput | Enumerable<CharacterSkillsUpdateWithWhereUniqueWithoutSkillInput>
  updateMany?: CharacterSkillsUpdateManyWithWhereNestedInput | Enumerable<CharacterSkillsUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterSkillsScalarWhereInput | Enumerable<CharacterSkillsScalarWhereInput>
  upsert?: CharacterSkillsUpsertWithWhereUniqueWithoutSkillInput | Enumerable<CharacterSkillsUpsertWithWhereUniqueWithoutSkillInput>
}

export type CharacterSpellsCreateManyWithoutSpellInput = {
  create?: CharacterSpellsCreateWithoutSpellInput | Enumerable<CharacterSpellsCreateWithoutSpellInput>
  connect?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
}

export type CharacterSpellsUpdateManyWithoutSpellInput = {
  create?: CharacterSpellsCreateWithoutSpellInput | Enumerable<CharacterSpellsCreateWithoutSpellInput>
  connect?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  set?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  disconnect?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  delete?: CharacterSpellsWhereUniqueInput | Enumerable<CharacterSpellsWhereUniqueInput>
  update?: CharacterSpellsUpdateWithWhereUniqueWithoutSpellInput | Enumerable<CharacterSpellsUpdateWithWhereUniqueWithoutSpellInput>
  updateMany?: CharacterSpellsUpdateManyWithWhereNestedInput | Enumerable<CharacterSpellsUpdateManyWithWhereNestedInput>
  deleteMany?: CharacterSpellsScalarWhereInput | Enumerable<CharacterSpellsScalarWhereInput>
  upsert?: CharacterSpellsUpsertWithWhereUniqueWithoutSpellInput | Enumerable<CharacterSpellsUpsertWithWhereUniqueWithoutSpellInput>
}

export type ClassCreateOneWithoutProficienciesInput = {
  create?: ClassCreateWithoutProficienciesInput
  connect?: ClassWhereUniqueInput
}

export type ClassUpdateOneWithoutProficienciesInput = {
  create?: ClassCreateWithoutProficienciesInput
  connect?: ClassWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ClassUpdateWithoutProficienciesDataInput
  upsert?: ClassUpsertWithoutProficienciesInput
}

export type ClassCreateOneWithoutTraitsInput = {
  create?: ClassCreateWithoutTraitsInput
  connect?: ClassWhereUniqueInput
}

export type ClassUpdateOneWithoutTraitsInput = {
  create?: ClassCreateWithoutTraitsInput
  connect?: ClassWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ClassUpdateWithoutTraitsDataInput
  upsert?: ClassUpsertWithoutTraitsInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type RaceCreateWithoutCharacterInput = {
  name?: string | null
}

export type ClassCreateWithoutCharacterInput = {
  name?: string | null
  hitdice?: string | null
  hpfirstlevel?: number | null
  hpperlevel?: number | null
  hpperlevel_roll?: number | null
  proficiencies?: ProficiencyCreateManyWithoutClassInput
  traits?: TraitCreateManyWithoutClassInput
}

export type CharacterEquipmentCreateWithoutCharacterInput = {
  item: EquipmentCreateOneWithoutCharacterEquipmentInput
}

export type CharacterSkillsCreateWithoutCharacterInput = {
  skill: SkillCreateOneWithoutCharacterSkillsInput
}

export type CharacterSpellsCreateWithoutCharacterInput = {
  spell: SpellCreateOneWithoutCharacterSpellsInput
}

export type RaceUpdateWithoutCharacterDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type RaceUpsertWithoutCharacterInput = {
  update: RaceUpdateWithoutCharacterDataInput
  create: RaceCreateWithoutCharacterInput
}

export type ClassUpdateWithoutCharacterDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  hitdice?: string | NullableStringFieldUpdateOperationsInput | null
  hpfirstlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel_roll?: number | NullableIntFieldUpdateOperationsInput | null
  proficiencies?: ProficiencyUpdateManyWithoutClassInput
  traits?: TraitUpdateManyWithoutClassInput
}

export type ClassUpsertWithoutCharacterInput = {
  update: ClassUpdateWithoutCharacterDataInput
  create: ClassCreateWithoutCharacterInput
}

export type CharacterEquipmentUpdateWithWhereUniqueWithoutCharacterInput = {
  where: CharacterEquipmentWhereUniqueInput
  data: CharacterEquipmentUpdateWithoutCharacterDataInput
}

export type CharacterEquipmentUpdateManyWithWhereNestedInput = {
  where: CharacterEquipmentScalarWhereInput
  data: CharacterEquipmentUpdateManyDataInput
}

export type CharacterEquipmentScalarWhereInput = {
  AND?: CharacterEquipmentScalarWhereInput | Enumerable<CharacterEquipmentScalarWhereInput>
  OR?: CharacterEquipmentScalarWhereInput | Enumerable<CharacterEquipmentScalarWhereInput>
  NOT?: CharacterEquipmentScalarWhereInput | Enumerable<CharacterEquipmentScalarWhereInput>
  id?: IntFilter | number
  characterId?: IntFilter | number
  equipmentId?: IntFilter | number
}

export type CharacterEquipmentUpsertWithWhereUniqueWithoutCharacterInput = {
  where: CharacterEquipmentWhereUniqueInput
  update: CharacterEquipmentUpdateWithoutCharacterDataInput
  create: CharacterEquipmentCreateWithoutCharacterInput
}

export type CharacterSkillsUpdateWithWhereUniqueWithoutCharacterInput = {
  where: CharacterSkillsWhereUniqueInput
  data: CharacterSkillsUpdateWithoutCharacterDataInput
}

export type CharacterSkillsUpdateManyWithWhereNestedInput = {
  where: CharacterSkillsScalarWhereInput
  data: CharacterSkillsUpdateManyDataInput
}

export type CharacterSkillsScalarWhereInput = {
  AND?: CharacterSkillsScalarWhereInput | Enumerable<CharacterSkillsScalarWhereInput>
  OR?: CharacterSkillsScalarWhereInput | Enumerable<CharacterSkillsScalarWhereInput>
  NOT?: CharacterSkillsScalarWhereInput | Enumerable<CharacterSkillsScalarWhereInput>
  id?: IntFilter | number
  characterId?: IntFilter | number
  skillId?: IntFilter | number
}

export type CharacterSkillsUpsertWithWhereUniqueWithoutCharacterInput = {
  where: CharacterSkillsWhereUniqueInput
  update: CharacterSkillsUpdateWithoutCharacterDataInput
  create: CharacterSkillsCreateWithoutCharacterInput
}

export type CharacterSpellsUpdateWithWhereUniqueWithoutCharacterInput = {
  where: CharacterSpellsWhereUniqueInput
  data: CharacterSpellsUpdateWithoutCharacterDataInput
}

export type CharacterSpellsUpdateManyWithWhereNestedInput = {
  where: CharacterSpellsScalarWhereInput
  data: CharacterSpellsUpdateManyDataInput
}

export type CharacterSpellsScalarWhereInput = {
  AND?: CharacterSpellsScalarWhereInput | Enumerable<CharacterSpellsScalarWhereInput>
  OR?: CharacterSpellsScalarWhereInput | Enumerable<CharacterSpellsScalarWhereInput>
  NOT?: CharacterSpellsScalarWhereInput | Enumerable<CharacterSpellsScalarWhereInput>
  id?: IntFilter | number
  characterId?: IntFilter | number
  spellId?: IntFilter | number
}

export type CharacterSpellsUpsertWithWhereUniqueWithoutCharacterInput = {
  where: CharacterSpellsWhereUniqueInput
  update: CharacterSpellsUpdateWithoutCharacterDataInput
  create: CharacterSpellsCreateWithoutCharacterInput
}

export type CharacterCreateWithoutEquipmentInput = {
  createdAt?: Date | string
  name?: string | null
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
  race: RaceCreateOneWithoutCharacterInput
  class: ClassCreateOneWithoutCharacterInput
  CharacterSkills?: CharacterSkillsCreateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsCreateManyWithoutCharacterInput
}

export type EquipmentCreateWithoutCharacterEquipmentInput = {
  name?: string | null
  type?: string | null
  description?: string | null
}

export type CharacterUpdateWithoutEquipmentDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
  race?: RaceUpdateOneRequiredWithoutCharacterInput
  class?: ClassUpdateOneRequiredWithoutCharacterInput
  CharacterSkills?: CharacterSkillsUpdateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsUpdateManyWithoutCharacterInput
}

export type CharacterUpsertWithoutEquipmentInput = {
  update: CharacterUpdateWithoutEquipmentDataInput
  create: CharacterCreateWithoutEquipmentInput
}

export type EquipmentUpdateWithoutCharacterEquipmentDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  type?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
}

export type EquipmentUpsertWithoutCharacterEquipmentInput = {
  update: EquipmentUpdateWithoutCharacterEquipmentDataInput
  create: EquipmentCreateWithoutCharacterEquipmentInput
}

export type CharacterCreateWithoutCharacterSkillsInput = {
  createdAt?: Date | string
  name?: string | null
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
  race: RaceCreateOneWithoutCharacterInput
  class: ClassCreateOneWithoutCharacterInput
  equipment?: CharacterEquipmentCreateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsCreateManyWithoutCharacterInput
}

export type SkillCreateWithoutCharacterSkillsInput = {
  name?: string | null
}

export type CharacterUpdateWithoutCharacterSkillsDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
  race?: RaceUpdateOneRequiredWithoutCharacterInput
  class?: ClassUpdateOneRequiredWithoutCharacterInput
  equipment?: CharacterEquipmentUpdateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsUpdateManyWithoutCharacterInput
}

export type CharacterUpsertWithoutCharacterSkillsInput = {
  update: CharacterUpdateWithoutCharacterSkillsDataInput
  create: CharacterCreateWithoutCharacterSkillsInput
}

export type SkillUpdateWithoutCharacterSkillsDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SkillUpsertWithoutCharacterSkillsInput = {
  update: SkillUpdateWithoutCharacterSkillsDataInput
  create: SkillCreateWithoutCharacterSkillsInput
}

export type CharacterCreateWithoutCharacterSpellsInput = {
  createdAt?: Date | string
  name?: string | null
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
  race: RaceCreateOneWithoutCharacterInput
  class: ClassCreateOneWithoutCharacterInput
  equipment?: CharacterEquipmentCreateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsCreateManyWithoutCharacterInput
}

export type SpellCreateWithoutCharacterSpellsInput = {
  name?: string | null
}

export type CharacterUpdateWithoutCharacterSpellsDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
  race?: RaceUpdateOneRequiredWithoutCharacterInput
  class?: ClassUpdateOneRequiredWithoutCharacterInput
  equipment?: CharacterEquipmentUpdateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsUpdateManyWithoutCharacterInput
}

export type CharacterUpsertWithoutCharacterSpellsInput = {
  update: CharacterUpdateWithoutCharacterSpellsDataInput
  create: CharacterCreateWithoutCharacterSpellsInput
}

export type SpellUpdateWithoutCharacterSpellsDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type SpellUpsertWithoutCharacterSpellsInput = {
  update: SpellUpdateWithoutCharacterSpellsDataInput
  create: SpellCreateWithoutCharacterSpellsInput
}

export type CharacterEquipmentCreateWithoutItemInput = {
  character: CharacterCreateOneWithoutEquipmentInput
}

export type CharacterEquipmentUpdateWithWhereUniqueWithoutItemInput = {
  where: CharacterEquipmentWhereUniqueInput
  data: CharacterEquipmentUpdateWithoutItemDataInput
}

export type CharacterEquipmentUpsertWithWhereUniqueWithoutItemInput = {
  where: CharacterEquipmentWhereUniqueInput
  update: CharacterEquipmentUpdateWithoutItemDataInput
  create: CharacterEquipmentCreateWithoutItemInput
}

export type CharacterCreateWithoutRaceInput = {
  createdAt?: Date | string
  name?: string | null
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
  class: ClassCreateOneWithoutCharacterInput
  equipment?: CharacterEquipmentCreateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsCreateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsCreateManyWithoutCharacterInput
}

export type CharacterUpdateWithWhereUniqueWithoutRaceInput = {
  where: CharacterWhereUniqueInput
  data: CharacterUpdateWithoutRaceDataInput
}

export type CharacterUpdateManyWithWhereNestedInput = {
  where: CharacterScalarWhereInput
  data: CharacterUpdateManyDataInput
}

export type CharacterScalarWhereInput = {
  AND?: CharacterScalarWhereInput | Enumerable<CharacterScalarWhereInput>
  OR?: CharacterScalarWhereInput | Enumerable<CharacterScalarWhereInput>
  NOT?: CharacterScalarWhereInput | Enumerable<CharacterScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  name?: StringNullableFilter | string | null
  raceId?: IntFilter | number
  classId?: IntFilter | number
  alignment?: StringFilter | string
  experience?: IntFilter | number
  background?: StringFilter | string
  personality?: StringFilter | string
  ideals?: StringFilter | string
  bonds?: StringFilter | string
  flaw?: StringFilter | string
  hp?: IntFilter | number
  temphp?: IntFilter | number
  maxhp?: IntFilter | number
  strength?: IntFilter | number
  dexterity?: IntFilter | number
  intelligence?: IntFilter | number
  wisdom?: IntFilter | number
  charisma?: IntFilter | number
  age?: IntFilter | number
  size?: StringFilter | string
  height?: StringFilter | string
  weight?: StringFilter | string
  eyes?: StringFilter | string
  skin?: StringFilter | string
  hair?: StringFilter | string
  appearance?: StringFilter | string
  allies_org?: StringFilter | string
  backstory?: StringFilter | string
  treasure?: StringFilter | string
}

export type CharacterUpsertWithWhereUniqueWithoutRaceInput = {
  where: CharacterWhereUniqueInput
  update: CharacterUpdateWithoutRaceDataInput
  create: CharacterCreateWithoutRaceInput
}

export type ProficiencyCreateWithoutClassInput = {
  name?: string | null
}

export type TraitCreateWithoutClassInput = {
  name?: string | null
  description?: string | null
  level: number
}

export type CharacterCreateWithoutClassInput = {
  createdAt?: Date | string
  name?: string | null
  alignment: string
  experience: number
  background: string
  personality: string
  ideals: string
  bonds: string
  flaw: string
  hp: number
  temphp: number
  maxhp: number
  strength: number
  dexterity: number
  intelligence: number
  wisdom: number
  charisma: number
  age: number
  size: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  appearance: string
  allies_org: string
  backstory: string
  treasure: string
  race: RaceCreateOneWithoutCharacterInput
  equipment?: CharacterEquipmentCreateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsCreateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsCreateManyWithoutCharacterInput
}

export type ProficiencyUpdateWithWhereUniqueWithoutClassInput = {
  where: ProficiencyWhereUniqueInput
  data: ProficiencyUpdateWithoutClassDataInput
}

export type ProficiencyUpdateManyWithWhereNestedInput = {
  where: ProficiencyScalarWhereInput
  data: ProficiencyUpdateManyDataInput
}

export type ProficiencyScalarWhereInput = {
  AND?: ProficiencyScalarWhereInput | Enumerable<ProficiencyScalarWhereInput>
  OR?: ProficiencyScalarWhereInput | Enumerable<ProficiencyScalarWhereInput>
  NOT?: ProficiencyScalarWhereInput | Enumerable<ProficiencyScalarWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  classId?: IntNullableFilter | number | null
}

export type ProficiencyUpsertWithWhereUniqueWithoutClassInput = {
  where: ProficiencyWhereUniqueInput
  update: ProficiencyUpdateWithoutClassDataInput
  create: ProficiencyCreateWithoutClassInput
}

export type TraitUpdateWithWhereUniqueWithoutClassInput = {
  where: TraitWhereUniqueInput
  data: TraitUpdateWithoutClassDataInput
}

export type TraitUpdateManyWithWhereNestedInput = {
  where: TraitScalarWhereInput
  data: TraitUpdateManyDataInput
}

export type TraitScalarWhereInput = {
  AND?: TraitScalarWhereInput | Enumerable<TraitScalarWhereInput>
  OR?: TraitScalarWhereInput | Enumerable<TraitScalarWhereInput>
  NOT?: TraitScalarWhereInput | Enumerable<TraitScalarWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  description?: StringNullableFilter | string | null
  level?: IntFilter | number
  classId?: IntNullableFilter | number | null
}

export type TraitUpsertWithWhereUniqueWithoutClassInput = {
  where: TraitWhereUniqueInput
  update: TraitUpdateWithoutClassDataInput
  create: TraitCreateWithoutClassInput
}

export type CharacterUpdateWithWhereUniqueWithoutClassInput = {
  where: CharacterWhereUniqueInput
  data: CharacterUpdateWithoutClassDataInput
}

export type CharacterUpsertWithWhereUniqueWithoutClassInput = {
  where: CharacterWhereUniqueInput
  update: CharacterUpdateWithoutClassDataInput
  create: CharacterCreateWithoutClassInput
}

export type CharacterSkillsCreateWithoutSkillInput = {
  character: CharacterCreateOneWithoutCharacterSkillsInput
}

export type CharacterSkillsUpdateWithWhereUniqueWithoutSkillInput = {
  where: CharacterSkillsWhereUniqueInput
  data: CharacterSkillsUpdateWithoutSkillDataInput
}

export type CharacterSkillsUpsertWithWhereUniqueWithoutSkillInput = {
  where: CharacterSkillsWhereUniqueInput
  update: CharacterSkillsUpdateWithoutSkillDataInput
  create: CharacterSkillsCreateWithoutSkillInput
}

export type CharacterSpellsCreateWithoutSpellInput = {
  character: CharacterCreateOneWithoutCharacterSpellsInput
}

export type CharacterSpellsUpdateWithWhereUniqueWithoutSpellInput = {
  where: CharacterSpellsWhereUniqueInput
  data: CharacterSpellsUpdateWithoutSpellDataInput
}

export type CharacterSpellsUpsertWithWhereUniqueWithoutSpellInput = {
  where: CharacterSpellsWhereUniqueInput
  update: CharacterSpellsUpdateWithoutSpellDataInput
  create: CharacterSpellsCreateWithoutSpellInput
}

export type ClassCreateWithoutProficienciesInput = {
  name?: string | null
  hitdice?: string | null
  hpfirstlevel?: number | null
  hpperlevel?: number | null
  hpperlevel_roll?: number | null
  traits?: TraitCreateManyWithoutClassInput
  Character?: CharacterCreateManyWithoutClassInput
}

export type ClassUpdateWithoutProficienciesDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  hitdice?: string | NullableStringFieldUpdateOperationsInput | null
  hpfirstlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel_roll?: number | NullableIntFieldUpdateOperationsInput | null
  traits?: TraitUpdateManyWithoutClassInput
  Character?: CharacterUpdateManyWithoutClassInput
}

export type ClassUpsertWithoutProficienciesInput = {
  update: ClassUpdateWithoutProficienciesDataInput
  create: ClassCreateWithoutProficienciesInput
}

export type ClassCreateWithoutTraitsInput = {
  name?: string | null
  hitdice?: string | null
  hpfirstlevel?: number | null
  hpperlevel?: number | null
  hpperlevel_roll?: number | null
  proficiencies?: ProficiencyCreateManyWithoutClassInput
  Character?: CharacterCreateManyWithoutClassInput
}

export type ClassUpdateWithoutTraitsDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  hitdice?: string | NullableStringFieldUpdateOperationsInput | null
  hpfirstlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel?: number | NullableIntFieldUpdateOperationsInput | null
  hpperlevel_roll?: number | NullableIntFieldUpdateOperationsInput | null
  proficiencies?: ProficiencyUpdateManyWithoutClassInput
  Character?: CharacterUpdateManyWithoutClassInput
}

export type ClassUpsertWithoutTraitsInput = {
  update: ClassUpdateWithoutTraitsDataInput
  create: ClassCreateWithoutTraitsInput
}

export type CharacterEquipmentUpdateWithoutCharacterDataInput = {
  item?: EquipmentUpdateOneRequiredWithoutCharacterEquipmentInput
}

export type CharacterEquipmentUpdateManyDataInput = {

}

export type CharacterSkillsUpdateWithoutCharacterDataInput = {
  skill?: SkillUpdateOneRequiredWithoutCharacterSkillsInput
}

export type CharacterSkillsUpdateManyDataInput = {

}

export type CharacterSpellsUpdateWithoutCharacterDataInput = {
  spell?: SpellUpdateOneRequiredWithoutCharacterSpellsInput
}

export type CharacterSpellsUpdateManyDataInput = {

}

export type CharacterEquipmentUpdateWithoutItemDataInput = {
  character?: CharacterUpdateOneRequiredWithoutEquipmentInput
}

export type CharacterUpdateWithoutRaceDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
  class?: ClassUpdateOneRequiredWithoutCharacterInput
  equipment?: CharacterEquipmentUpdateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsUpdateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsUpdateManyWithoutCharacterInput
}

export type CharacterUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
}

export type ProficiencyUpdateWithoutClassDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ProficiencyUpdateManyDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
}

export type TraitUpdateWithoutClassDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  level?: number | IntFieldUpdateOperationsInput
}

export type TraitUpdateManyDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  description?: string | NullableStringFieldUpdateOperationsInput | null
  level?: number | IntFieldUpdateOperationsInput
}

export type CharacterUpdateWithoutClassDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | NullableStringFieldUpdateOperationsInput | null
  alignment?: string | StringFieldUpdateOperationsInput
  experience?: number | IntFieldUpdateOperationsInput
  background?: string | StringFieldUpdateOperationsInput
  personality?: string | StringFieldUpdateOperationsInput
  ideals?: string | StringFieldUpdateOperationsInput
  bonds?: string | StringFieldUpdateOperationsInput
  flaw?: string | StringFieldUpdateOperationsInput
  hp?: number | IntFieldUpdateOperationsInput
  temphp?: number | IntFieldUpdateOperationsInput
  maxhp?: number | IntFieldUpdateOperationsInput
  strength?: number | IntFieldUpdateOperationsInput
  dexterity?: number | IntFieldUpdateOperationsInput
  intelligence?: number | IntFieldUpdateOperationsInput
  wisdom?: number | IntFieldUpdateOperationsInput
  charisma?: number | IntFieldUpdateOperationsInput
  age?: number | IntFieldUpdateOperationsInput
  size?: string | StringFieldUpdateOperationsInput
  height?: string | StringFieldUpdateOperationsInput
  weight?: string | StringFieldUpdateOperationsInput
  eyes?: string | StringFieldUpdateOperationsInput
  skin?: string | StringFieldUpdateOperationsInput
  hair?: string | StringFieldUpdateOperationsInput
  appearance?: string | StringFieldUpdateOperationsInput
  allies_org?: string | StringFieldUpdateOperationsInput
  backstory?: string | StringFieldUpdateOperationsInput
  treasure?: string | StringFieldUpdateOperationsInput
  race?: RaceUpdateOneRequiredWithoutCharacterInput
  equipment?: CharacterEquipmentUpdateManyWithoutCharacterInput
  CharacterSkills?: CharacterSkillsUpdateManyWithoutCharacterInput
  CharacterSpells?: CharacterSpellsUpdateManyWithoutCharacterInput
}

export type CharacterSkillsUpdateWithoutSkillDataInput = {
  character?: CharacterUpdateOneRequiredWithoutCharacterSkillsInput
}

export type CharacterSpellsUpdateWithoutSpellDataInput = {
  character?: CharacterUpdateOneRequiredWithoutCharacterSpellsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
