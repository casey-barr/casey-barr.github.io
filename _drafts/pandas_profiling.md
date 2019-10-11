---
layout: posts
title:  "Introduction to Pandas Profiling"
tags:   [python, pandas, data, statistics]
---


Recently I learned of a cool Python package called`pandas_profiling`that serves as an extension of the `pandas.DataFrame.describe()` function in the pandas module. The package serves as a nice way to automate a lot of the common statistics generated when looking at data, such as the following:

>**Essentials**: type, unique values, missing values  
>**Quantile statistics** like minimum value, Q1, median, Q3, maximum, range, interquartile range  
>**Descriptive statistics** like mean, mode, standard deviation, sum, median absolute deviation, coefficient of variation, kurtosis, skewness  
>**Most frequent values**  
>**Histogram**  
>**Correlations** highlighting of highly correlated variables, Spearman, Pearson and Kendall matrices  
>**Missing values** matrix, count, heatmap and dendrogram of missing values  

This article will serve as an introduction to the package, and show the ease of use to implement it in Python. 

## Installing the package

To install the package, open an Anaconda prompt terminal and type:

```bash
pip install pandas_profiling
```

If you're installing from a Jupyter notebook, you can instead type:
```python
import sys
!{sys.executable} -m pip install pandas_profiling
```

## Using the package
Implementing the`pandas_profiling`method is as simple as adding one extra function to the end of a pandas DataFrame. To create and output the report, add`.profile_report()`after the name of the DataFrame and execute the function, which will then output an overview display similar to the screenshot below. For this example, I'll be using data from the [2019 Economic Freedom of the World Index](https://www.fraserinstitute.org/economic-freedom/dataset?geozone=world&page=dataset&min-year=2&max-year=0&filter=0).

```python
import pandas as pd
import pandas profiling

pd.read_excel("https://raw.githubusercontent.com/casey-barr/misc-data/master/economic_data/efw-2019-master-index-data-for-researchers.csv").profile_report()
```

![overview](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/pandas_profiling/ewf_index_overview.png)

Below, you'll also find a gif that highlights some of the other statistics and views that the profile_report() function generates.

| ![](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/pandas_profiling/p_nistrup_profiling_report.gif) | 
|:--:| 
| *Photo Credit: [Peter Nistrup](https://towardsdatascience.com/exploring-your-data-with-just-1-line-of-python-4b35ce21a82d)* |

The pandas_profiling method generates a lot of interesting statistics regarding your dataset of focus, and does so in an efficient and automated way. I've since added it to my list of tools when analyzing data in Python, as it saves a lot of time when examining a large dataset that has a lot of cardinality.

Link to the`pandas_profiling`[GitHub page](https://github.com/pandas-profiling/pandas-profiling).
