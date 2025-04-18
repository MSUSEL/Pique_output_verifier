import {z} from 'zod'

const diagnostic = z.object({
    toolName: z.string(),
    name: z.string(),
    value : z.number(),
    description : z.string(),
    children: z.record(z.object({})),
    weights : z.record(z.number()),
    eval_strategy : z.string(),
    normalizer : z.string(),
    utility_function : z.object({
        name: z.string(),
        description : z.string(),
    })
});

const measure = z.object({
    positive : z.boolean(),
    name: z.string(),
    value : z.number(),
    description : z.string(),
    children: z.record(diagnostic),
    weights : z.record(z.number()),
    thresholds : z.array(z.number()),
    eval_strategy : z.string(),
    normalizer : z.string(),
    utility_function : z.object({
        name: z.string(),
        description : z.string(),
    })
});

const product_factor = z.object({
    name: z.string(),
    value : z.number(),
    description : z.string(),
    children: z.record(measure),
    weights : z.record(z.number()),
    eval_strategy : z.string(),
    normalizer : z.string(),
    utility_function : z.object({
        name: z.string(),
        description : z.string(),
    })
});

const quality_aspect = z.object({
    name: z.string(),
    value : z.number(),
    description : z.string(),
    children: z.record(product_factor.or(measure)),
    weights : z.record(z.number()),
    eval_strategy : z.string(),
    normalizer : z.string(),
    utility_function : z.object({
        name: z.string(),
        description : z.string(),
    })
});


const tqi = z.object({
    name: z.string(),
    value : z.number(),
    description : z.string(),
    children: z.record(quality_aspect),
    weights : z.record(z.number()),
    eval_strategy : z.string(),
    normalizer : z.string(),
    utility_function : z.object({
        name: z.string(),
        description : z.string(),
    })
});

const RootEvalType = z.object({
    name : z.string(),
    additionalData : z.object({
        projectName : z.string(),
    }),
    global_config : z.object({
        benchmark_strategy : z.string(),
        weights_strategy : z.string(),
    }),
    factors : z.object({
        product_factors : z.record(product_factor),
        quality_aspects : z.record(quality_aspect),
        tqi : z.record(tqi)
    }),
    measures : z.record(measure),
    diagnostics : z.record(diagnostic)
});

export default RootEvalType;
export type EvalType = z.infer<typeof RootEvalType>

