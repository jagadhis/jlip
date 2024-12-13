export default function BadgeSteps() {
  const steps = [
    {
      id: 1,
      title: 'Basic Spreadsheet Magic',
      description: 'Learn how to create and organize your first spreadsheet'
    },
    {
      id: 2,
      title: 'Formula Adventures',
      description: 'Discover the power of basic formulas'
    },
    {
      id: 3,
      title: 'Chart Champion',
      description: 'Create your first awesome charts'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="font-bold text-blue-500">{step.id}</span>
          </div>
          <div>
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}