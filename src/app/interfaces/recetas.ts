export interface RecipeInfo {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    aggregateLikes:           number;
    healthScore:              number;
    extendedIngredients:      ExtendedIngredient[];
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    sourceUrl:                string;
    image:                    string;
    summary:                  string;
    cuisines:                 any[];
    dishTypes:                string[];
    diets:                    any[];
    occasions:                any[];
    instructions:             string;
    analyzedInstructions:     any[];
    spoonacularScore:         number;
    spoonacularSourceUrl:     string;
}

export interface ExtendedIngredient {
    id:           number;
    aisle:        string;
    image:        string;
    name:         string;
    nameClean:    string;
    original:     string;
    originalName: string;
    amount:       number;
    unit:         string;
    measures:     Measures;
}


export interface Measures {
    us:     Metric;
    metric: Metric;
}

export interface Metric {
    amount:    number;
    unitShort: string;
    unitLong:  string;
}

export interface ListaRecetasPersonalizadas { //agregar el id del usuario para identificar que lista de listas pertenece a cada user. Cuando un usuario inicia sesion hay que hacer un get de sus listas y cargarlas automaticamente
    id ?: number;
    nombre ?: string; // Nombre de la lista
    recetas: RecipeInfo[]; // Array de recetas (puedes usar la interfaz que ya tienes para recetas)
  }

