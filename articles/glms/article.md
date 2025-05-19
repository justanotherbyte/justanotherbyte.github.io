# Generalized Linear Models
<br>

If you've taken a statistics class, you've certainly come across Linear Regression, and possibly other models like Logistic Regression. You may have been taught both seperately, with their respective hypothesis functions being pulled out of thin air, however, they both derive quite beautifully.

<br>

This article is my attempt at summarizing Generalized Linear Models, both for the purposes of cementing my own learning, and hopefully helping a rare reader. This article is based entirely off of Andrew Ng's CS229 (Autumn 2018) series. The particular video I learnt from can be found here: [Lecture 4](https://www.youtube.com/watch?v=iZTeva0WSTQ&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=7). Generalized Linear Models extend naturally from the Exponential Family of statistical distributions, so we'll cover them first.

<br>

## Exponential Family
<br>

A distribution that is part of the exponential family of distributions must fit the following form:

<br>

```latex
p(y;\eta) = b(y) \exp(\eta^T T(y) - a(\eta))
```

<br>

Here, <ila>\eta</ila> is the **natural parameter**, <ila>T(y)</ila> is the **sufficient statistic** (often, <ila>T(y)=y</ila>) and <ila>a(\eta)</ila> is the **log-partition function**. <ila>p(y;\eta)</ila> is the probability density or mass function, depending on whether your chosen distribution is continous or discrete, respectively. The natural parameter <ila>\eta</ila> is the parameter that appears in the PDF or PMF, for example, in a Bernoulli distribution defined as <ila>\phi^y (1 - \phi)^{1-y}</ila>, <ila>\phi</ila> will become a function **purely** of <ila>\phi</ila>. To prove a statistical distribution is part of the exponential family, you need to show that it's PDF or PMF can be manipulated to fit the above form.

<br>

### Bernoulli Distribution
<br>

To illustrate this, we'll use the Bernoulli distribution as an example. We begin by defining the distribution's PMF and slowly manipulating it to fit the exponential family form.

<br>

```latex
p(y;\phi) = \phi^y (1 - \phi)^{1-y}
```

<br>

```latex
= \exp(\ln(\phi^y (1 - \phi)^{1-y}))
```

<br>

```latex
= \exp(\ln(\phi^y) + \ln((1 - \phi)^{1-y}))
```

<br>

```latex
= \exp(y\ln(\phi) + (1 - \phi)\ln(1 - \phi))
```

<br>

```latex
= \exp(y\ln(\phi) + \ln(1 - \phi) - y\ln(1 - \phi))
```

<br>

```latex
= \exp(y\ln(\frac{\phi}{1 - \phi}) + \ln(1 - \phi))
```

<br>

We've successfully manipulated the distribution to fit the exponential family definition, provind that the Bernoulli distribution is a family within the exponential family (I'll get into what a family within a family means soon). Doing some pattern matching, we can extract the following *parameters*:

<br>

```latex
b(y) = 1
```

<br>

```latex
\eta = \ln(\frac{\phi}{1 - \phi})
```
<br>

```latex
T(y) = y
```
<br>

```latex
a(\eta) = -\ln(1 - \phi) = \ln(1 + e^\eta)
```
<br>

The latter definition for <ila>a(\eta)</ila> can be found by re-arranging the definition for <ila>\eta</ila> in terms of <ila>\phi</ila> and simply substituting back into the former definition. This is simple, but is algebraically long, so I won't include it here.

<br>

## Constructing GLMs
<br>

Constructing GLMs involves the same set of recurring steps. Depending on the task at hand, an appropriate distribution must be chosen, manipulated into the exponential family form, and it's respective set of parameters found. To finally construct the GLM, two **main** assumptions/design-choices need to be made.

<br>

- The first design choice is relating <ila>\eta = \theta^T x</ila> where <ila>\theta, x \in \R^n</ila>. <ila>\theta</ila> is a set of **learnable** parameters, and <ila>n</ila> is the number of features you have.
- At test time, the output of the model is the expected value of the distribution, i.e <ila>E[y|x; \theta]</ila>.

<br>

GLMs have a nice property whereby their expected value is actually given by the derivative of <ila>a(\eta)</ila> with respect to <ila>\eta</ila>, which is a lot nicer than the traditional integral approach of calculating the expected value of a random variable or distribution. To convince you of this, I'll write a quick derivation for the expected value of the log-partition that we derived for Bernoulli:

<br>

```latex
a(\eta) = \ln(1 + e^\eta)
```
<br>

```latex
\frac{\partial}{\partial \eta} (\ln(1 + e^\eta)) = \frac{e^\eta}{1 + e^\eta} = \frac{1}{1 + e^{-\eta}}
```
<br>

This is indeed the sigmoid function that we use in Logistic Regression! If you're interested in a similar derivation for Linear Regression using the Gaussian Distribution, I've uploaded full derivations for everything [here](articles/glms/glms-derivations.pdf), since the CS229 lecture notes tend to skip over some algebra (which is fair, just some people may want to see all the steps).

<br>


![GLM diagram](articles/glms/diagram.png "A good representation of how GLMs should be thought about.")

<br>

*More coming soon: last updated 19/05/2025 12:06*