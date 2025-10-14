const company = {
    name: 'ООО Агро',
    employees: [
        {
            name: 'Света',
        },
        {
            name: 'Никита',
        },
                {
            name: 'Катя',
        },
    ],
    ceo: {
        name: 'Вася',
    },
    getCompanyName: function() {
        return this.name;
    },
    getCompanySEO: function() {
        return this.ceo;
    },
    getCompanyEmployees: function() {
        return this.employees.map(employee => employee.name);
    },
    getCompanyEmployee: function(name) {
        return this.employees.map(employee => {
        if(employee.name === name) {
            return employee;
        }
        return false;
        });
    },
}