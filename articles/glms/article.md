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

*More coming soon, last updated: 19 May 01:08*