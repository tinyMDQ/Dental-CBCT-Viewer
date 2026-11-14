/**
 * "Star on GitHub" link button. Renders a plain link to the repository and
 * deliberately makes NO network request to api.github.com — a medical tool
 * must not phone home to third-party services from the landing page, so no
 * live star count is fetched or shown.
 */
export declare function GithubStar(): import("react/jsx-runtime").JSX.Element;
