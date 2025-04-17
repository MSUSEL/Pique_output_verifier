

export type RootEvalType = {
    name: string,
    additionalData: {
        "projectName": string
    },
    global_config : {
        "benchmark_strategy": string,
        "weights_strategy": string,
    }
    factors : {
        product_factors : Record<string, product_factor>,
        quality_aspects : Record<string, quality_aspect>,
        tqi : Record<string, tqi>
    },
    measures : Record<string, measure>,
    diagnostics : Record<string, diagnostic>,
}

type tqi = {
    name: string,
    value: number,
    description: string,
    children : Record<string, quality_aspect>,
    weights: Record<string, number>,
    eval_strategy: string,
    normalizer: string,
    utility_function: {
        name: string,
        description: string,
    }
}

type quality_aspect = {
    name: string,
    value: number,
    description: string,
    children : Record<string, product_factor | measure>,
    weights: Record<string, number>,
    eval_strategy: string,
    normalizer: string,
    utility_function: {
        name: string,
        description: string,
    }
}

type product_factor = {
    name: string,
    value: number,
    description: string,
    children: Record<string, measure | diagnostic>,
    weights: Record<string, number>,
    eval_strategy: string,
    normalizer: string,
    utility_function: {
        name: string,
        description: string,

    }
}

type measure = {
    positive: boolean,
    name: string,
    value: number,
    description: string,
    children : Record<string, diagnostic | measure>,
    weights: Record<string, number>,
    thresholds: number[],
    eval_strategy: string,
    normalizer: string,
    utility_function: {
        name: string,
        description: string,
    }
}

type diagnostic = {
    toolName: string,
    name: string,
    value: number,
    description: string,
    children : {}, //Should alway be empty
    weights: {}, //Should always be empty
    eval_strategy: string,
    normalizer: string,
    utility_function: {
        name: string,
        description: string,
    }
}

//example of creating custom diagnostic
interface extra extends diagnostic{
    docker: string,
}

//example of overwiting a field in a parent type
interface extra2 extends Omit<diagnostic, "children"> {
    children : number
}