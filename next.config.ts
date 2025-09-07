import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

function isRuleSetRule(rule: unknown): rule is RuleSetRule {
	return typeof rule === "object" && rule !== null && "test" in rule;
}

const nextConfig: NextConfig = {
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(isRuleSetRule);

		if (!fileLoaderRule) {
			throw new Error("File loader rule not found");
		}

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: {
					not: [...((fileLoaderRule.resourceQuery as any)?.not ?? []), /url/],
				},
				use: ["@svgr/webpack"],
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
	images: {
		domains: ["images.unsplash.com"],
	},
};

export default nextConfig;
